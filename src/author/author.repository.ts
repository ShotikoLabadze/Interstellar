import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorEntity } from './entities/author.entity';

@Injectable()
export class AuthorRepository {
  private authors: AuthorEntity[] = [];
  private idCounter = 1;

  create(createAuthorDto: CreateAuthorDto): AuthorEntity {
    const newAuthor: AuthorEntity = {
      id: this.idCounter++,
      ...createAuthorDto,
    };
    this.authors.push(newAuthor);
    return newAuthor;
  }

  findAll(): AuthorEntity[] {
    return this.authors;
  }

  findOne(id: number): AuthorEntity {
    const author = this.authors.find((author) => author.id === id);
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto): AuthorEntity {
    const author = this.findOne(id);
    const updatedAuthor = { ...author, ...updateAuthorDto };
    const index = this.authors.findIndex((author) => author.id === id);
    this.authors[index] = updatedAuthor;
    return updatedAuthor;
  }

  remove(id: number): void {
    const index = this.authors.findIndex((author) => author.id === id);
    if (index === -1) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    this.authors.splice(index, 1);
  }
}
