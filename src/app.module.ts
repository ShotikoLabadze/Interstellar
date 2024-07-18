import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicModule } from './music/music.module';
import { SearchModule } from './search/search.module';
import { AuthorModule } from './author/author.module';
import { AlbumModule } from './album/album.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MusicModule, SearchModule, AuthorModule, AlbumModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
