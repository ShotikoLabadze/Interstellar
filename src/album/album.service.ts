import { Injectable, Search } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from './album.repository';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(private readonly albumsRepository: AlbumRepository) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.albumsRepository.create(createAlbumDto);
  }

  async findAll() {
    return await this.albumsRepository.findAll();
  }

  async findAllSearch(search?: string) {
    return await this.albumsRepository.findAllSearch(search);
  }

  async findOne(id: number): Promise<AlbumEntity> {
    return await this.albumsRepository.findOne(id);
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return await this.albumsRepository.update(id, updateAlbumDto);
  }

  async remove(id: number) {
    return await this.albumsRepository.remove(id);
  }
}
