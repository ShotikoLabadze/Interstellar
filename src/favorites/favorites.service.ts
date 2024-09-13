import { Injectable } from '@nestjs/common';
import { CreateFavoritesDto } from './dto/create-favorites.dto';
import { FavoritesEntity } from './entities/favorites.entity';
import { FavoritesRepository } from './favorites.repository';

@Injectable()
export class FavoritesService {
  constructor(private readonly favoritesRepository: FavoritesRepository) {}

  async create(createFavoritesDto: CreateFavoritesDto) {
    return await this.favoritesRepository.create(createFavoritesDto);
  }

  async findAll() {
    return await this.favoritesRepository.findAll();
  }

  async findOne(id: number) {
    return await this.favoritesRepository.findOne(id);
  }

  async remove(id: number) {
    return await this.favoritesRepository.remove(id);
  }
}
