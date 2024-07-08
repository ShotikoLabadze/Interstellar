import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { AuthorModule } from '../author/author.module';
import { MusicModule } from '../music/music.module';
import { MusicRepository } from 'src/music/music.repository';

@Module({
  imports: [AuthorModule, MusicModule],
  providers: [SearchService, MusicRepository],
  controllers: [SearchController],
})
export class SearchModule {}
