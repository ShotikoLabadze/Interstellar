import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< HEAD
import { AlbumModule } from './album/album.module';
import { MusicModule } from './music/music.module';
import { SearchModule } from './search/search.module';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [AuthorModule, MusicModule, SearchModule],
=======
import { MusicModule } from './music/music.module';
import { SearchModule } from './search/search.module';
import { AuthorModule } from './author/author.module';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [MusicModule, SearchModule, AuthorModule, AlbumModule],
>>>>>>> feat/INTS-32/Implement-Search-Module
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
