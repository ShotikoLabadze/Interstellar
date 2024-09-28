import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateAlbumDto } from './dto/update-album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MusicEntity } from 'src/music/entities/music.entity';
import { FileEntity } from 'src/files/entities/file.entity';
import { AuthorEntity } from 'src/author/entities/author.entity';

@Injectable()
export class AlbumRepository {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(MusicEntity)
    private musicRepository: Repository<MusicEntity>,
  ) {}

  async create(
    file: FileEntity,
    createAlbumDto: CreateAlbumDto,
    author: AuthorEntity,
  ) {
    const album = this.albumRepository.create({
      ...createAlbumDto,
      file, 
      author,
    });
    return await this.albumRepository.save(album);
  }

  async findAll() {
    return await this.albumRepository.find({
      relations: ['file', 'musics','musics.file'], 
      order: { createdAt: 'DESC' },
    });
  }

  async addMusicsToAlbum(albumId: number, musicIds: number[]) {
    const album = await this.albumRepository.findOne({
      where: { id: albumId },
      relations: ['musics'],
    });

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    const musics = await this.musicRepository.findByIds(musicIds);

    if (!album.musics) {
      album.musics = [];
    }

    album.musics.push(...musics);

    return await this.albumRepository.save(album);
  }

  async removeMusicsFromAlbum(albumId: number, musicIds: number[]) {
    if (!musicIds || !Array.isArray(musicIds) || musicIds.length === 0) {
      throw new BadRequestException('Invalid or missing musicIds');
    }

    const album = await this.albumRepository.findOne({
      where: { id: albumId },
      relations: ['musics'],
    });
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    album.musics = album.musics.filter((music) => !musicIds.includes(music.id));

    return await this.albumRepository.save(album);
  }

  async findAllSearch(search?: string) {
    if (!search) return [];
    const albums = await this.albumRepository
      .createQueryBuilder('album')
       .leftJoinAndSelect('album.file', 'file')
      .where('album.albumName LIKE :name', { name: `%${search}%` }) 
      .getMany();
  
    return albums;
  }

  async findOne(id: number): Promise<AlbumEntity> {
    const album = await this.albumRepository
      .createQueryBuilder('album')
      .where('album.id=:id', { id })
      .leftJoinAndSelect('album.author', 'author')
      .leftJoinAndSelect('album.musics', 'musics')
      .leftJoinAndSelect('album.file', 'file')
      .leftJoinAndSelect('musics.file','musicFile')
      .getOne();

    // const album = await this.albumRepository.findOne({
    //   where: { id },
    //   relations: { author: true, musics: true, file: true },
    // });

    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }

    return album;
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    const { ...albumData } = updateAlbumDto;

    await this.albumRepository
      .createQueryBuilder()
      .update()
      .set(albumData)
      .where('id = :id', { id })
      .execute();

    // if (musicIds && musicIds.length > 0) {
    //   const musics = [];
    //   for (const musicId of musicIds) {
    //     const music = await this.musicRepository.findOne({
    //       where: { id: musicId },
    //     });
    //     if (music) {
    //       musics.push(music);
    //     }
    //   }
    //   const album = await this.findOne(id);
    //   if (album) {
    //     album.musics = musics;
    //     await this.albumRepository.save(album);
    //   }
    // }
    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.albumRepository.softDelete(id);
    return await this.albumRepository
      .createQueryBuilder('album')
      .withDeleted()
      .where('album.id = :id', { id })
      .getOne();
  }
}
