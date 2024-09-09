import { Injectable } from '@nestjs/common';
import { AuthorRepository } from '../author/author.repository';
import { MusicRepository } from '../music/music.repository';
import { AlbumRepository } from 'src/album/album.repository';
import { PlaylistRepository } from 'src/playlist/playlist.repository';
@Injectable()
export class SearchService {
  constructor(
    private readonly musicRepository: MusicRepository,
    private readonly albumRepository: AlbumRepository,
    private readonly authorRepository: AuthorRepository,
    private readonly playlistRepository: PlaylistRepository,
  ) {}

  async findAllSearch(search: string) {
    const authors = await this.authorRepository.findAllSearch(search);
    const music = await this.musicRepository.findAllSearch(search);
    const album = await this.albumRepository.findAllSearch(search);
    const playlist =  await this.playlistRepository.findAllSearch(search);
    return { authors, music, album, playlist };

}
}