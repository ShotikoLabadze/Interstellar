import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './album/album.module';
import { MusicModule } from './music/music.module';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [AlbumModule, MusicModule, AuthorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
