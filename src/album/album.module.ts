import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumRepository } from './album.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { MusicEntity } from 'src/music/entities/music.entity';
import { AuthorEntity } from 'src/author/entities/author.entity'; // Import AuthorEntity
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlbumEntity, MusicEntity, AuthorEntity]), // Add AuthorEntity
    FilesModule,
  ],
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository],
  exports: [TypeOrmModule, AlbumService],
})
export class AlbumModule {}
