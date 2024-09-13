import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { FavoritesEntity } from 'src/favorites/entities/favorites.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, FavoritesEntity])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository, UserService, TypeOrmModule],
})
export class UserModule {}
