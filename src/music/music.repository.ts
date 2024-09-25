import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MusicEntity } from './entities/music.entity';
import { Repository } from 'typeorm';
import { FileEntity } from 'src/files/entities/file.entity';

@Injectable()
export class MusicRepository {
  constructor(
    @InjectRepository(MusicEntity)
    private musicRepository: Repository<MusicEntity>,
  ) {}

  async create(file: FileEntity, createMusicDto: CreateMusicDto) {
    const music = await this.musicRepository.save({
      ...createMusicDto,
      files: [file],
    });

    return music;
  }

  async playCount(id: number) {
    const music = await this.musicRepository.findOne({ where: { id } });
    if (!music) {
      throw new NotFoundException('Music not found');
    }
    music.playCount += 1;
    return await this.musicRepository.save(music);
  }

  async findTopHits() {
    return await this.musicRepository.find({
      order: {
        playCount: 'DESC',
      },
    });
  }

  async findAll() {
    return await this.musicRepository.find({
      relations: {
        file: true,
      },
    });
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
      .where('music.id = :id', { id })
      .leftJoinAndSelect('music.file', 'file')
      .getOne();

    if (!music) {
      throw new NotFoundException(`Music with ID ${id} not found`);
    }

    return music;
  }

  async findByViews(): Promise<MusicEntity[]> {
    return await this.musicRepository.find({
      order: {
        views: 'DESC',
      },
    });
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
