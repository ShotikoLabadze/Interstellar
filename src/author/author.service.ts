import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorRepository } from './author.repository';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository,
    private readonly fileService: FilesService,
  ) {}

  async create(file,createAuthorDto: CreateAuthorDto) {
    const res = await this.fileService.uploadFile(file)
    return await this.authorRepository.create(res,createAuthorDto);
  }

  findAll(search?: string) {
    return this.authorRepository.findAll();
  }

  findAllSearch(search?: string) {
    return this.authorRepository.findAllSearch(search);
  }

  findOne(id: number) {
    return this.authorRepository.findOne(id);
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return this.authorRepository.update(id, updateAuthorDto);
  }

  remove(id: number) {
    return this.authorRepository.remove(id);
  }
}
