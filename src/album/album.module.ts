import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumRepository } from './album.repository';
import { SearchService } from 'src/search/search.service';
import { AuthorRepository } from 'src/author/author.repository';
import { MusicRepository } from 'src/music/music.repository';
@Module({
  controllers: [AlbumController],
  providers: [
    AlbumService,
    AlbumRepository,
    SearchService,
    AuthorRepository,
    MusicRepository,
  ],
  exports: [AlbumRepository],
})
export class AlbumModule {}
