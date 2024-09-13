import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesEntity } from './entities/favorites.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { MusicEntity } from 'src/music/entities/music.entity';
import { FavoritesRepository } from './favorites.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoritesEntity, UserEntity, MusicEntity]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoritesRepository],
  exports: [FavoritesRepository],
})
export class FavoritesModule {}
