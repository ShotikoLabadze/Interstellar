import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorEntity } from './entities/author.entity';
import { FileEntity } from 'src/files/entities/file.entity';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectRepository(AuthorEntity)
    private authorRepository: Repository<AuthorEntity>,
  ) {}

  async create(file: FileEntity, createAuthorDto: CreateAuthorDto) {
    const author = this.authorRepository.save({
      ...createAuthorDto,
      files: [file],
    });
    return author;
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
      .update(AuthorEntity)
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
