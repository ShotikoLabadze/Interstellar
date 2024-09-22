import { Injectable, Search } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from './album.repository';
import { AlbumEntity } from './entities/album.entity';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumsRepository: AlbumRepository,
    private readonly fileService: FilesService,
  ) {}

  async create(file, createAlbumDto: CreateAlbumDto) {
    const res = await this.fileService.uploadFile(file);
    return await this.albumsRepository.create(res, createAlbumDto);
  }

  async addMusicsToAlbum(albumId: number, musicIds: number[]) {
    return await this.albumsRepository.addMusicsToAlbum(albumId, musicIds);
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
