import { Injectable, Search } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from './album.repository';

@Injectable()
export class AlbumService {
  constructor(private readonly albumsRepository: AlbumRepository) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.albumsRepository.create(createAlbumDto);
  }
  async findAll() {
    return this.albumsRepository.findAll();
  }

  async findAllSearch(search: string) {
    return this.albumsRepository.findAllSearch(search);
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
