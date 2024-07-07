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
  searchAuthors(search: string): AuthorEntity[] {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly authorsRepository: AuthorRepository) {}

  create(createAuthorDto: CreateAuthorDto) {
    return this.authorsRepository.create(createAuthorDto);
  }

  findAll() {
    return this.authorsRepository.findAll();
  }

  findOne(id: number) {
    return this.authorsRepository.findOne(id);
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return this.authorsRepository.update(id, updateAuthorDto);
  }

  remove(id: number) {
    return this.authorsRepository.remove(id);
  }
}
