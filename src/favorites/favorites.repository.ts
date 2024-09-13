import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFavoritesDto } from './dto/create-favorites.dto';
import { FavoritesEntity } from './entities/favorites.entity';

@Injectable()
export class FavoritesRepository {
  constructor(
    @InjectRepository(FavoritesEntity)
    private readonly favoritesRepository: Repository<FavoritesEntity>,
  ) {}

  async create(createFavoritesDto: CreateFavoritesDto) {
    const favorites = this.favoritesRepository.create({
      user: { id: createFavoritesDto.userId },
      music: { id: createFavoritesDto.musicId },
    });
    return await this.favoritesRepository.save(favorites);
  }

  async findAll() {
    return await this.favoritesRepository.find();
  }

  async findOne(id: number) {
    return await this.favoritesRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    const favorites = await this.findOne(id);
    if (!favorites) {
      throw new Error(`Favorites with ID ${id} not found`);
    }
    await this.favoritesRepository.remove(favorites);
    return favorites;
  }
}
