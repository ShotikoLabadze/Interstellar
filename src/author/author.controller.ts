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

  @Post(':id/albums') // POST to add an existing album
  async addAlbumId(
    @Param('id') authorId: string,
    @Body('albumId') albumId: number, // Accept the existing album ID
  ) {
    return await this.authorService.addExistingAlbumToAuthor(
      +authorId,
      albumId,
    );
  }
  @Get()
  async findAll() {
    return await this.authorService.findAll();
  }

  @Get(':id/albums')
  async getAuthorWithAlbumsAndMusic(@Param('id') id: string) {
    return await this.authorService.findAlbumsWithMusicByAuthor(+id);
  }

  @Get(':authorId/albums/:albumId/musics')
async getAlbumMusicByAuthor(
  @Param('authorId') authorId: string, 
  @Param('albumId') albumId: string
) {
  return await this.authorService.findMusicByAuthorAndAlbum(+authorId, +albumId);
}

  @Post(':id/albums')
  async addAlbumToAuthor(
    @Param('id') id: string,
    @Body() createAlbumDto: CreateAlbumDto,
  ) {
    return await this.authorService.addAlbumToAuthor(+id, createAlbumDto);
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
