import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorRepository } from './author.repository';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { AuthorEntity } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  create(createAuthorDto: CreateAuthorDto) {
    return this.authorRepository.create(createAuthorDto);
  }

  findAll(search?: string) {
    return this.authorRepository.findAll();
  }

  findAllSearch(search?: string) {
    return this.authorRepository.findAllSearch(search);
  }

  findOne(id: number): Promise<AuthorEntity>{
    return this.authorRepository.findOne(id);
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return this.authorRepository.update(id, updateAuthorDto);
  }

  remove(id: number) {
    return this.authorRepository.remove(id);
  }
}
