import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoritesDto } from './dto/create-favorites.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  async create(@Body() createFavoritesDto: CreateFavoritesDto) {
    return await this.favoritesService.create(createFavoritesDto);
  }

  @Get()
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.favoritesService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.favoritesService.remove(+id);
  }
}
