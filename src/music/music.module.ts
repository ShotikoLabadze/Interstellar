import { Module, forwardRef } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { MusicRepository } from './music.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicEntity } from './entities/music.entity';
import { AlbumModule } from 'src/album/album.module';
import { FilesModule } from 'src/files/files.module';
import { FileEntity } from 'src/files/entities/file.entity';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { ListenersRepository } from 'src/listeners/listeners.repository';
import { ListenerEntity } from 'src/listeners/entities/listener.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MusicEntity , ListenerEntity]),
    AlbumModule,
    FilesModule,
    UserModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [MusicController],
  providers: [MusicService, MusicRepository , ListenersRepository],
  exports: [MusicService, MusicRepository, TypeOrmModule],
})
export class MusicModule {}
