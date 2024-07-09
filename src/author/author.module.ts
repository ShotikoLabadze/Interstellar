import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { AuthorRepository } from './author.repository';
import { SearchService } from 'src/search/search.service';
import { MusicRepository } from 'src/music/music.repository';
import { AlbumRepository } from 'src/album/album.repository';

@Module({
  controllers: [AuthorController],
  providers: [
    AlbumRepository,
    AuthorService,
    AuthorRepository,
    SearchService,
    MusicRepository,
  ],
  exports: [AuthorRepository],
})
export class AuthorModule {}
