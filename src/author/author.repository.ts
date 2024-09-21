import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorEntity } from './entities/author.entity';
import { FileEntity } from 'src/files/entities/file.entity';
import { error } from 'console';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectRepository(AuthorEntity)
    private authorRepository: Repository<AuthorEntity>,
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  async create(file: FileEntity, createAuthorDto: CreateAuthorDto) {
    const author = this.authorRepository.save({
      ...createAuthorDto,
      files: [file],
    });
    return author;
  }

  async findAll() {
    const query = await this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.files', 'files')
      .leftJoinAndSelect('author.albums', 'albums')
      .getMany();
    return query;
  }

  async addAlbumToAuthor(authorId: number, createAlbumDto: CreateAlbumDto) {
    const author = await this.authorRepository.findOne({
      where: { id: authorId },
      relations: ['albums'],
    });

    if (!author) {
      throw new Error('Author not found');
    }

    const newAlbum = this.albumRepository.create({
      ...createAlbumDto, // This will use the album details (albumName, releaseDate)
      author, // Link the author to the album
    });

    await this.albumRepository.save(newAlbum);
    // Return the updated author with the new album included
    return author;
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
  async findOneWithAlbums(id: number) {
    return this.authorRepository.findOne({
      where: { id },
      relations: ['albums'],
    });
  }


  async findOne(id: number) {
    const query = await this.authorRepository
      .createQueryBuilder('author')
      .where('author.id = :id', { id })
      .leftJoinAndSelect('author.files', 'files')
      .leftJoinAndSelect('author.musics', 'musics')
      .leftJoinAndSelect('author.albums', 'albums')
      .getOne();


    return query;
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
