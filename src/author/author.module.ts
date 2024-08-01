import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { AuthorRepository } from './author.repository';
import { SearchService } from 'src/search/search.service';
import { MusicRepository } from 'src/music/music.repository';
import { AlbumRepository } from 'src/album/album.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from './entities/author.entity';
import { MusicModule } from 'src/music/music.module';
import { AlbumModule } from 'src/album/album.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorRepository]),
    MusicModule,
    AlbumModule,
  ],
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
