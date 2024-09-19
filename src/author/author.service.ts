import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorRepository } from './author.repository';
import { FilesService } from 'src/files/files.service';

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
