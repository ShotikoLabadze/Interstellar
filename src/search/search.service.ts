import { Injectable } from '@nestjs/common';
import { AuthorRepository } from '../author/author.repository';
import { MusicRepository } from '../music/music.repository';
import { AlbumRepository } from 'src/album/album.repository';
@Injectable()
export class SearchService {
  constructor(
    private readonly musicRepository: MusicRepository,
    private readonly albumRepository: AlbumRepository,
    private readonly authorRepository: AuthorRepository
  ) {}

  async findAll(search: string) {
    const authors = this.authorRepository.findAllSearch(search);
    const music = await this.musicRepository.findAllSearch(search);
    const album = await this.albumRepository.findAllSearch(search);
    return { music , album, author} 
  }
}
