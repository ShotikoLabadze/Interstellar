import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { AuthorRepository } from './author.repository';
import { SearchService } from 'src/search/search.service';
import { MusicRepository } from 'src/music/music.repository';
import { AlbumRepository } from 'src/album/album.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { MusicModule } from 'src/music/music.module';

@Module({
  imports: [TypeOrmModule.forFeature([Author]), MusicModule],
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
