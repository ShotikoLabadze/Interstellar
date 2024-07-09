import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorRepository {
  private authors = [];

  create(createAuthorDto: CreateAuthorDto) {
    const newAuthor = { id: this.authors.length + 1, ...createAuthorDto };
    this.authors.push(newAuthor);
    return newAuthor;
  }
  findAll(search?: string) {
    if (search) {
      return this.authors.filter(
        (author) =>
          author.firstName.includes(search) ||
          author.lastName.includes(search) ||
          author.biography.includes(search) ||
          author.musics.includes(search),
      );
    }
    return this.authors;
  }

  findOne(id: number) {
    for (let i = 0; i < this.authors.length; i++) {
      if (this.authors[i].id === Number(id)) {
        return this.authors[i];
      }
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

  remove(id: number) {
    for (let i = 0; i < this.authors.length; i++) {
      if (this.authors[i].id === Number(id)) {
        const [removedAuthors] = this.authors.splice(i, 1);
        return removedAuthors;
      }
    }
    return 'error';
  }
}
