import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body('authorId') authorId: number, 
    @Body() createAlbumDto: CreateAlbumDto,
    
  ) {
    createAlbumDto.authorId = authorId; 
    return await this.albumService.create(file, createAlbumDto);
  }

  @Get()
  async findAll() {
    return await this.albumService.findAll();
  }
  @Put(':id/musics')
  async addMusics(
    @Param('id') id: number,
    @Body('musicIds') musicIds: number[],
  ) {
    return await this.albumService.addMusicsToAlbum(id, musicIds);
  }

  @Get('search')
  async findAllSearch(@Query('search') search: string) {
    return await this.albumService.findAllSearch(search);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.albumService.findOne(+id);
  }

  @Delete(':id/musics')
  async removeMusics(
    @Param('id') albumId: number,
    @Body('musicIds') musicIds: number[],
  ) {
    return await this.albumService.removeMusicsFromAlbum(albumId, musicIds);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return await this.albumService.update(+id, updateAlbumDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.albumService.remove(+id);
  }
}
