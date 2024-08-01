import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MusicEntity } from './entities/music.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MusicRepository {
  constructor(@InjectRepository(MusicEntity)
              private musicRepository: Repository<MusicEntity>){}

  async create(createMusicDto: CreateMusicDto){
    const music = this.musicRepository.create(createMusicDto)
    return await this.musicRepository.save(music)
  }

  async findAll() {
    return await this.musicRepository
               .createQueryBuilder('music')
               .getMany();
  }

  async findAllSearch(search?: string) {
    if (search) {
      return await this.musicRepository
                 .createQueryBuilder('music')
                 .where('name LIKE :search', { search: `%${search}%`})
                 .getMany();
    }else {
      return await "there is nothing try search something else";
    }
  }

  async findOne(id: number) {
    return await this.musicRepository
               .createQueryBuilder('music')
               .where('music.id = :id', { id })
               .getOne();
  }

  async update(id: number, updateMusicDto: UpdateMusicDto) {
    await this.musicRepository
              .createQueryBuilder('music')
              .update()
              .set(updateMusicDto)
              .where('id = :id', { id })
              .execute()
              

    return this.findOne(id)
  }

  async remove(id: number) {
    await this.musicRepository.softDelete(id);
    return await this.musicRepository
               .createQueryBuilder('music')
               .withDeleted()
               .where('music.id = :id', { id })
               .getOne()
  }

}