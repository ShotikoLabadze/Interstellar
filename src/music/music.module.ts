import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { MusicRepository } from './music.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicEntity } from './entities/music.entity';
import { AlbumModule } from 'src/album/album.module';
import { FilesModule } from 'src/files/files.module';
import { FileEntity } from 'src/files/entities/file.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MusicEntity]),
    AlbumModule,
    FilesModule,
    AuthModule,
  ],
  controllers: [MusicController],
  providers: [MusicService, MusicRepository],
  exports: [MusicService, MusicRepository, TypeOrmModule],
})
export class MusicModule {}
