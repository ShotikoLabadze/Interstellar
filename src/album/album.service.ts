import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from './album.repository';

@Injectable()
export class AlbumService {
  constructor(private readonly albumsRepository: AlbumRepository) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.albumsRepository.create(createAlbumDto);
  }

  findAll(search?: string) {
    return this.albumsRepository.findAll(search);
  }

  findOne(id: number) {
    return this.albumsRepository.findOne(id);
  }

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return this.albumsRepository.update(id, updateAlbumDto);
  }

  remove(id: number) {
    return this.albumsRepository.remove(id);
  }
}
