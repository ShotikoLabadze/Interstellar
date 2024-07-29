import { Injectable } from '@nestjs/common';
import { AuthorRepository } from '../author/author.repository';
import { MusicRepository } from '../music/music.repository';
import { AlbumRepository } from 'src/album/album.repository';
@Injectable()
export class SearchService {
  constructor(
    private readonly authorRepository: AuthorRepository,
    private readonly musicRepository: MusicRepository,
    private readonly albumRepository: AlbumRepository,
  ) {}

  findAllSearch(search: string) {
    const authors = this.authorRepository.findAllSearch(search);
    const music = this.musicRepository.findAll(search);
    const album = this.albumRepository.findAll(search);
    return { authors, music, album };
  }
}
