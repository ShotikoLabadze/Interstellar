import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorRepository {
  private authors = [];

  create(createAlbumDto: CreateAuthorDto) {
    const newAlbum = { id: this.authors.length + 1, ...CreateAuthorDto };
    this.authors.push(newAlbum);
    return newAlbum;
  }

  findAll() {
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
        const updatedAuthors = { ...this.authors[i], ...UpdateAuthorDto };
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
