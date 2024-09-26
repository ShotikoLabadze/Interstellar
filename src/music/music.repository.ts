import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MusicEntity } from './entities/music.entity';
import { Repository } from 'typeorm';
import { FileEntity } from 'src/files/entities/file.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';

@Injectable()
export class MusicRepository {
  constructor(
    @InjectRepository(MusicEntity)
    private musicRepository: Repository<MusicEntity>,
  ) {}

  async create(
    file: FileEntity,
    createMusicDto: CreateMusicDto,
    album: AlbumEntity,
  ) {
    const music = await this.musicRepository.save({
      ...createMusicDto,
      albums: [album],
      file: file,
    });

    return music;
  }

  async findAll() {
    const musics = await this.musicRepository
      .createQueryBuilder('music')
      .leftJoinAndSelect('music.file', 'file')
      .leftJoinAndSelect('music.albums', 'albums')
      .leftJoinAndSelect('music.listeners', 'listeners')
      .select([
        'music.id AS id',
        'music.name AS name',
        'music.artistName AS artistName',
        'music.file AS file',
        'music.createdAt AS createdAt',
        'music.updatedAt AS updatedAt',
        'music.deletedAt AS deletedAt',
        'COUNT(listeners.id) AS listenerCount', 
      ])
      .groupBy('music.id') 
      .orderBy('listenerCount', 'DESC') 
      .getRawMany();
      return musics.map(music => ({
        id: music.id,
        name: music.name,
        artistName: music.artistName,
        file: music.file,
        createdAt: music.createdAt,
        updatedAt: music.updatedAt,
        deletedAt: music.deletedAt,
        listenerCount: Number(music.listenerCount) || 0, 
      }));
  }

  async findAllSearch(search?: string) {
    if (search) {
      return await this.musicRepository
        .createQueryBuilder('music')
        .where('name LIKE :search', { search: `%${search}%` })
        .getMany();
    } else {
      return await [];
    }
  }

  async findOne(id: number): Promise<MusicEntity> {
    const music = await this.musicRepository
      .createQueryBuilder('music')
      .leftJoinAndSelect('music.file', 'file')
      .leftJoinAndSelect('music.albums', 'albums')
      .leftJoinAndSelect('music.listeners', 'listeners')
      .where('music.id = :id', { id })
      .getOne();

    if (!music) {
      throw new NotFoundException(`Music with ID ${id} not found`);
    }

    return music;
  }

  async update(id: number, updateMusicDto: UpdateMusicDto) {
    await this.musicRepository
      .createQueryBuilder('music')
      .update()
      .set(updateMusicDto)
      .where('id = :id', { id })
      .execute();

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.musicRepository.softDelete(id);
    return await this.musicRepository
      .createQueryBuilder('music')
      .withDeleted()
      .where('music.id = :id', { id })
      .getOne();
  }
}
