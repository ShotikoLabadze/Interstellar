import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorService {
  private authors: Author[] = [];
  private idCounter = 1;

  create(createAuthorDto: CreateAuthorDto): Author {
    const author: Author = {
      id: this.idCounter++,
      ...createAuthorDto,
    };
    this.authors.push(author);
    return author;
  }

  findAll(): Author[] {
    return this.authors;
  }

  findOne(id: number): Author {
    const author = this.authors.find((author) => author.id === id);
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto): Author {
    const author = this.findOne(id);
    Object.assign(author, updateAuthorDto);
    return author;
  }

  remove(id: number): void {
    const index = this.authors.findIndex((author) => author.id === id);
    if (index === -1) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    this.authors.splice(index, 1);
  }
}
