import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './author/author.module';
import { MusicModule } from './music/music.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [AuthorModule, MusicModule, SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
