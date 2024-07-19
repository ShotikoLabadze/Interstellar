import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const author = this.authorRepository.create(createAuthorDto);
    return await this.authorRepository.save(author);
  }

  async findAll() {
    return await this.authorRepository.createQueryBuilder('author').getMany();
  }

  async findAllSearch(search?: string) {
    const query = this.authorRepository.createQueryBuilder('author');

    if (search) {
      query
        .where('author.firstName LIKE :search', { search: `%${search}%` })
        .orWhere('author.lastName LIKE :search', { search: `%${search}%` })
        .orWhere('author.biography LIKE :search', { search: `%${search}%` });
    }

    return await query.getMany();
  }

  async findOne(id: number) {
    return await this.authorRepository
      .createQueryBuilder('author')
      .where('author.id = :id', { id })
      .getMany();
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    await this.authorRepository
      .createQueryBuilder('author')
      .update(Author)
      .set(updateAuthorDto)
      .where('id = :id', { id })
      .execute();
  }

  async remove(id: number) {
    await this.authorRepository.softDelete(id);

    return this.authorRepository
      .createQueryBuilder('author')
      .withDeleted()
      .where('author.id = :id', { id })
      .getOne();
  }
}
