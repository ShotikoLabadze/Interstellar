import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
      .leftJoinAndSelect('albums.musics', 'musics')
      .getMany();
    return query;
  }

  async addAlbumToAuthor(authorId: number, createAlbumDto: CreateAlbumDto) {
    const author = await this.authorRepository.findOne({
      where: { id: authorId },
      relations: ['albums'],
    });

    if (!author) {
      throw new NotFoundException(`Author with ID ${authorId} not found`);
    }

    const newAlbum = this.albumRepository.create({
      ...createAlbumDto,
      author,
    });

    await this.albumRepository.save(newAlbum);

    return {
      ...author,
      albums: [...author.albums, newAlbum],
    };
  }

  async addAlbumsToAuthor(authorId: number, albumIds: number[]) {
    // Validate that albumIds is an array and has elements
    if (!albumIds || !Array.isArray(albumIds) || albumIds.length === 0) {
      throw new BadRequestException('Invalid or missing albumIds');
    }

    // Fetch the author with its albums
    const author = await this.authorRepository.findOne({
      where: { id: authorId },
      relations: ['albums'],
    });
    if (!author) {
      throw new NotFoundException('Author not found');
    }

    // Fetch the albums using the provided IDs
    const albums = await this.albumRepository.findByIds(albumIds);

    // Add the new albums to the existing ones
    if (!author.albums) {
      author.albums = [];
    }
    author.albums.push(...albums);

    // Save the updated author with the new albums
    return await this.authorRepository.save(author);
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
      .leftJoinAndSelect('author.albums', 'albums')
      .leftJoinAndSelect('albums.musics', 'musics')
      .leftJoinAndSelect('albums.file','file')
      .getOne();

    if (!query) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }

    return query;
  }

  async findAlbumsWithMusicByAuthor(authorId: number) {
    const authorWithAlbums = await this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.albums', 'album')
      .leftJoinAndSelect('album.musics', 'music')
      .where('author.id = :authorId', { authorId })
      .getOne();

    if (!authorWithAlbums) {
      throw new NotFoundException('Author not found');
    }

    return {
      id: authorWithAlbums.id,
      firstName: authorWithAlbums.firstName,
      lastName: authorWithAlbums.lastName,
      biography: authorWithAlbums.biography,
      albums: authorWithAlbums.albums.map((album) => ({
        id: album.id,
        releaseDate: album.releaseDate,
        albumName: album.albumName,
        artistName: album.artistName,
        musics: album.musics, // This includes only the music associated with this album
      })),
    };
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
