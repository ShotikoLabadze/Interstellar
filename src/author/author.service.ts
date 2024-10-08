import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorRepository } from './author.repository';
import { FilesService } from 'src/files/files.service';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';

@Injectable()
export class AuthorService {
  constructor(
    private readonly authorRepository: AuthorRepository,
    private readonly fileService: FilesService,
  ) {}

  async create(file, createAuthorDto: CreateAuthorDto) {
    const res = await this.fileService.uploadFile(file);
    return await this.authorRepository.create(res, createAuthorDto);
  }

  async findAll() {
    return await this.authorRepository.findAll();
  }

  async findAllSearch(search?: string) {
    return await this.authorRepository.findAllSearch(search);
  }

  async addAlbumsToAuthor(authorId: number, albumIds: number[]) {
    return await this.authorRepository.addAlbumsToAuthor(authorId, albumIds);
  }

  async findAlbumsByAuthor(id: number) {
    return await this.authorRepository.findOneWithAlbums(id);
  }

  async findOne(id: number) {
    return await this.authorRepository.findOne(id);
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return await this.authorRepository.update(id, updateAuthorDto);
  }

  async remove(id: number) {
    return await this.authorRepository.remove(id);
  }
}
