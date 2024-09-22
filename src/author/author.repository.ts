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

  async findAlbumByAuthor(authorId: number, albumId: number) {
    const author = await this.authorRepository.findOne({
      where: { id: authorId },
      relations: ['albums',],
    });

    if (!author) {
      throw new NotFoundException(`Author with ID ${authorId} not found`);
    }

    const album = author.albums.find((album) => album.id === albumId);

    if (!album) {
      throw new NotFoundException(
        `Album with ID ${albumId} not found for author with ID ${authorId}`,
      );
    }

    return album;
  }

  async addExistingAlbumToAuthor(authorId: number, albumId: number) {
    const author = await this.authorRepository.findOne({
      where: { id: authorId },
      relations: ['albums'],
    });

    if (!author) {
      throw new NotFoundException(`Author with ID ${authorId} not found`);
    }

    const existingAlbum = await this.albumRepository.findOne({
      where: { id: albumId },
    });

    if (!existingAlbum) {
      throw new NotFoundException(`Album with ID ${albumId} not found`);
    }

    existingAlbum.author = author;
    await this.albumRepository.save(existingAlbum);

    return {
      ...author,
      albums: [...author.albums, existingAlbum],
    };
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
      relations: ['albums',],
    });
  }

  async findOne(id: number) {
    const query = await this.authorRepository
      .createQueryBuilder('author')
      .where('author.id = :id', { id })
      .leftJoinAndSelect('author.albums', 'albums')
      .leftJoinAndSelect('albums.musics', 'musics')
      .leftJoinAndSelect('author.files', 'files')
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
        title: album.title,
        releaseDate: album.releaseDate,
        albumName: album.albumName,
        artistName: album.artistName,
        musics: album.musics, // This includes only the music associated with this album
      })),
    };
  }


  async findMusicByAuthorAndAlbum(authorId: number, albumId: number) {
    const albumWithMusic = await this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.albums', 'album')
      .leftJoinAndSelect('album.musics', 'music')
      .where('author.id = :authorId', { authorId })
      .andWhere('album.id = :albumId', { albumId })
      .getOne();
  
    if (!albumWithMusic || !albumWithMusic.albums.length) {
      throw new NotFoundException('Album or author not found');
    }
  
    const album = albumWithMusic.albums.find(a => a.id === albumId);
  
    return {
      albumId: album?.id,
      albumName: album?.albumName,
      musics: album?.musics || [],
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
