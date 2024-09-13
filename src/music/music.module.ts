import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { MusicRepository } from './music.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicEntity } from './entities/music.entity';
import { AlbumModule } from 'src/album/album.module';

@Module({
  imports: [TypeOrmModule.forFeature([MusicEntity]), AlbumModule],
  controllers: [MusicController],
  providers: [MusicService, MusicRepository],
  exports: [MusicService, MusicRepository, TypeOrmModule],
})
export class MusicModule {}
