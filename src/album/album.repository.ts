import { Injectable } from '@nestjs/common';

import { UpdateAlbumDto } from './dto/update-album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumRepository {
  findAllSearch(search: string) {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectRepository(Album)
  private albumRepository: Repository<Album>){}

create(createAlbumDto: CreateAlbumDto) {
const album = this.albumRepository.create(createAlbumDto)
return this.albumRepository
       .save(album)
}

findAll(search?: string) {
const query = this.albumRepository.createQueryBuilder('album');

if (search) {
query.where('album.name LIKE :name', { name: `%${search}%` });
}

return query.getMany();
}


findOne(id: number) {
return  this.albumRepository
      .createQueryBuilder('album')
      .where('album.id = :id', { id })
      .getMany()
}


async update(id: number, updateAlbumDto: UpdateAlbumDto) {
await this.albumRepository
      .createQueryBuilder('album')
      .update()
      .set(updateAlbumDto)
      .where('album.id = :id', { id })
      .execute()
}

async remove(id: number){
await this.albumRepository
      .softDelete(id)

return this.albumRepository
     .createQueryBuilder('album')
     .withDeleted()
     .where('album.id = :id', { id })
     .getOne()
}
}
