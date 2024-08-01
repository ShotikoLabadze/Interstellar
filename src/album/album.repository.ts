import { Injectable } from '@nestjs/common';

import { UpdateAlbumDto } from './dto/update-album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumRepository {
  constructor(@InjectRepository(AlbumEntity)
              private albumRepository: Repository<AlbumEntity>){}

  async create(createAlbumDto: CreateAlbumDto){
    const album = this.albumRepository.create(createAlbumDto)
    return await this.albumRepository.save(album)
  }

  async findAll() {
    return await this.albumRepository
               .createQueryBuilder('album')
               .getMany();
  }

  async findAllSearch(search?: string) {
    if (search) {
      return await this.albumRepository
                 .createQueryBuilder('album')
                 .where('album.title LIKE :name', { name: `%${search}%`})
                 .getMany();
    }
  }

  async findOne(id: number) {
    return await this.albumRepository
               .createQueryBuilder('album')
               .where('album.id = :id', { id })
               .getOne();
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    const query =  await this.albumRepository
              .createQueryBuilder()
              .update()
              .set(updateAlbumDto)
              .where('id = :id', {id})  
              .execute()
              
    return await this.findOne(id)
  }

  async remove(id: number) {
    await this.albumRepository.softDelete(id);
    return await this.albumRepository
               .createQueryBuilder('album')
               .withDeleted()
               .where('album.id = :id', { id })
               .getOne()
  }

}