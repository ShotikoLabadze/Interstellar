import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumRepository } from './album.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { MusicEntity } from 'src/music/entities/music.entity';
import { FilesService } from 'src/files/files.service';
import { FilesModule } from 'src/files/files.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlbumEntity, MusicEntity]),
    FilesModule,
    AuthModule,
  ],
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository],
  exports: [TypeOrmModule, AlbumService],
})
export class AlbumModule {}
