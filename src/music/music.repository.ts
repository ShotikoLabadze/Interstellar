import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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
    duration: number,
  ): Promise<MusicEntity> {
    if (!file) {
      throw new BadRequestException('File must be provided');
    }
  
    const music = await this.musicRepository.save({
      ...createMusicDto,
      albums: [album],
      file: file,
      duration, // Add the duration here
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
        'music.duration AS duration',
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
        duration: Number(music.duration) || 0,
        file: music.file,
        createdAt: music.createdAt,
        updatedAt: music.updatedAt,
        deletedAt: music.deletedAt,
        listenerCount: Number(music.listenerCount) || 0, 
      }));
  }
  async findAllSearch(search?: string): Promise<MusicEntity[]> {
    if (search) {
      return await this.musicRepository
        .createQueryBuilder('music')
        .where('music.name LIKE :search', { search: `%${search}%` })
        .getMany();
    } else {
      return [];
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
    console.log(music)
  
    return music; 
  }
  

  async update(id: number, updateMusicDto: UpdateMusicDto): Promise<MusicEntity> {
    await this.musicRepository
      .createQueryBuilder('music')
      .update()
      .set(updateMusicDto)
      .where('music.id = :id', { id })
      .execute();

    return this.findOne(id);
  }

  async remove(id: number): Promise<MusicEntity> {
    await this.musicRepository.softDelete(id);
    const deletedMusic = await this.musicRepository
      .createQueryBuilder('music')
      .withDeleted()
      .where('music.id = :id', { id })
      .getOne();

    return deletedMusic;
  }
}
