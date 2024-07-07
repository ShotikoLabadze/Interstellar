import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorRepository } from './author.repository';
<<<<<<< Updated upstream
import { AuthorEntity } from './entities/author.entity';
=======
>>>>>>> Stashed changes

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  create(createAuthorDto: CreateAuthorDto) {
    return this.authorRepository.create(createAuthorDto);
  }

  findAll() {
    return this.authorRepository.findAll();
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
