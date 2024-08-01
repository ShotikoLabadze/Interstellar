import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { AuthorModule } from '../author/author.module';
import { MusicModule } from '../music/music.module';
import { MusicRepository } from 'src/music/music.repository';
import { AlbumRepository } from 'src/album/album.repository';
import { AlbumModule } from 'src/album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicEntity } from 'src/music/entities/music.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { AuthorEntity } from 'src/author/entities/author.entity';

@Module({
  imports: [AuthorModule, MusicModule, AlbumModule, TypeOrmModule.forFeature([MusicEntity,AlbumEntity,AuthorEntity])],
  providers: [SearchService, MusicRepository, AlbumRepository],
  controllers: [SearchController],
})
export class SearchModule {}