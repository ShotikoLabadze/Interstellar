import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicModule } from './music/music.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [MusicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
