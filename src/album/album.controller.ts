import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { SearchDto } from 'src/search/dto/search.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll(@Query() searchDto: SearchDto) {
    return this.albumService.findAll(searchDto.search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.albumService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(+id, updateAlbumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albumService.remove(+id);
  }
}
