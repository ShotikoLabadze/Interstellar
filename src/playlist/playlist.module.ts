import { Module, forwardRef } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { PlaylistRepository } from './playlist.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistEntity } from './entities/playlist.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { MusicRepository } from 'src/music/music.repository';
import { MusicEntity } from 'src/music/entities/music.entity';
import { FilesModule } from 'src/files/files.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports:[TypeOrmModule.forFeature([PlaylistEntity,UserEntity,MusicEntity]),FilesModule,forwardRef(() => AuthModule)],
  controllers: [PlaylistController],
  providers: [PlaylistService,PlaylistRepository,UserRepository,MusicRepository],
  exports: [PlaylistRepository]
})
export class PlaylistModule {}