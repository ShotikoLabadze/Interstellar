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

async findAll(search: string) {
  const music = await this.musicRepository.findAll(search);
  return { music, };
}
}