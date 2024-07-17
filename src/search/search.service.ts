import { Injectable } from '@nestjs/common';
import { AuthorRepository } from '../author/author.repository';
import { MusicRepository } from '../music/music.repository';
import { AlbumRepository } from 'src/album/album.repository';
@Injectable()
export class SearchService {
  constructor(
    private readonly musicRepository: MusicRepository
  ) {}

  async findAll(search: string) {
    const music = await this.musicRepository.findAllSearch(search);
    return { music } 
  }
}
