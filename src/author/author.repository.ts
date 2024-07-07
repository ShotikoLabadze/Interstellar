import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
<<<<<<< Updated upstream
import { AuthorEntity } from './entities/author.entity';
=======
>>>>>>> Stashed changes

@Injectable()
export class AuthorRepository {
  private authors = [];

  create(createAuthorDto: CreateAuthorDto) {
    const newAuthor = { id: this.authors.length + 1, ...createAuthorDto };
    this.authors.push(newAuthor);
    return newAuthor;
  }

  findAll() {
    return this.authors;
  }

<<<<<<< Updated upstream
  findOne(id: number): AuthorEntity {
    const author = this.authors.find((author) => author.id === id);
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
=======
  findOne(id: number) {
    for (let i = 0; i < this.authors.length; i++) {
      if (this.authors[i].id === Number(id)) {
        return this.authors[i];
      }
>>>>>>> Stashed changes
    }
    return 'error';
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    for (let i = 0; i < this.authors.length; i++) {
      if (this.authors[i].id === Number(id)) {
        const updatedAuthors = { ...this.authors[i], ...updateAuthorDto };
        this.authors[i] = updatedAuthors;
        return updatedAuthors;
      }
    }
    return 'error';
  }

<<<<<<< Updated upstream
  remove(id: number): void {
    const index = this.authors.findIndex((author) => author.id === id);
    if (index === -1) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    this.authors.splice(index, 1);
=======
  remove(id: number) {
    for (let i = 0; i < this.authors.length; i++) {
      if (this.authors[i].id === Number(id)) {
        const [removedAuthors] = this.authors.splice(i, 1);
        return removedAuthors;
      }
    }
    return 'error';
>>>>>>> Stashed changes
  }
}
