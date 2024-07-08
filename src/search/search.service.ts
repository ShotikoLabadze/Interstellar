import { Injectable } from '@nestjs/common';
import { AuthorRepository } from '../author/author.repository';
import { MusicRepository } from '../music/music.repository';

@Injectable()
export class SearchService {
  constructor(
    private readonly authorRepository: AuthorRepository,
    private readonly musicRepository: MusicRepository,
  ) {}

  findAll(search: string) {
    const authors = this.authorRepository.findAll(search);
    const music = this.musicRepository.findAll(search);
    return { authors, music };
  }
}
