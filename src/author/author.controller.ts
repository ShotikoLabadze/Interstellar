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
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { SearchDto } from 'src/search/dto/search.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createAuthorDto: CreateAuthorDto,
  ) {
    return await this.authorService.create(file, createAuthorDto);
  }

  @Get('search')
  async findAllSearch(@Query('search') search?: string) {
    return await this.authorService.findAllSearch(search);
  }

  @Post(':id/albums')
  async addAlbumToAuthor(
    @Param('id') id: string, 
    @Body() createAlbumDto: CreateAlbumDto
  ) {
    return await this.authorService.addAlbumToAuthor(+id, createAlbumDto);
  }

  @Get()
  async findAll() {
    return await this.authorService.findAll();
  }

  @Get(':id/albums')
  async getAuthorAlbums(@Param('id') id: string) {
    return await this.authorService.findAlbumsByAuthor(+id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.authorService.findOne(+id);

  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return await this.authorService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.authorService.remove(+id);
  }
}
