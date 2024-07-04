import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorRepository } from './author.repository';
import { GetAuthorSearchDto } from './dto/seach-author.dto';
import { AuthorEntity } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(private readonly authorsRepository: AuthorRepository) {}

  create(createAuthorDto: CreateAuthorDto): AuthorEntity {
    return this.authorsRepository.create(createAuthorDto);
  }

  findAll(getAuthorSearchDto: GetAuthorSearchDto): AuthorEntity[] {
    if (getAuthorSearchDto && getAuthorSearchDto.search) {
      return this.authorsRepository.search(getAuthorSearchDto);
    } else {
      return this.authorsRepository.findAll();
    }
  }

  findOne(id: number): AuthorEntity {
    return this.authorsRepository.findOne(id);
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto): AuthorEntity {
    return this.authorsRepository.update(id, updateAuthorDto);
  }

  remove(id: number): void {
    this.authorsRepository.remove(id);
  }
}
