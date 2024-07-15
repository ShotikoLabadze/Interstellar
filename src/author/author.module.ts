import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { AuthorRepository } from './author.repository';
import { SearchService } from 'src/search/search.service';
import { MusicRepository } from 'src/music/music.repository';
import { AlbumRepository } from 'src/album/album.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from 'src/music/entities/music.entity';
import { Album } from 'src/album/entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Music,Album])],
  controllers: [AuthorController],
  providers: [
    AlbumRepository,
    AuthorService,
    MusicRepository,
    AuthorRepository,
    SearchService,
  ],
  exports: [AuthorRepository],
})
export class AuthorModule {}
