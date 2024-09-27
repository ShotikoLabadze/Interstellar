import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { PlaylistEntity } from 'src/playlist/entities/playlist.entity';
import { PlaylistRepository } from 'src/playlist/playlist.repository';
import { FavoritesEntity } from 'src/favorites/entities/favorites.entity';
import { AuthModule } from 'src/auth/auth.module';
import { MusicRepository } from 'src/music/music.repository';
import { MusicEntity } from 'src/music/entities/music.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      PlaylistEntity,
      FavoritesEntity,
      MusicEntity,
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, PlaylistRepository, MusicRepository],
  exports: [UserRepository],
})
export class UserModule {}
