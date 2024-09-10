import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { PlaylistEntity } from 'src/playlist/entities/playlist.entity';
import { PlaylistRepository } from 'src/playlist/playlist.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,PlaylistEntity])],
  controllers: [UserController],
  providers: [UserService, UserRepository , PlaylistRepository],
  exports: [UserRepository],
})
export class UserModule {}
