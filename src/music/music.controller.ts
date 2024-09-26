import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseInterceptors,
  Param,
  Delete,
  Query,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @UseGuards(AdminGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createMusicDto: CreateMusicDto,
  ) {
    return await this.musicService.create(file, createMusicDto);
  }

  @Get()
  async findAll() {
    return await this.musicService.findAll();
  }

  @Get('top-hits')
  async getTopHits() {
    return await this.musicService.findTopHits();
  }

  // @Get('most-viewed')
  // async getViews() {
  //   return await this.musicService.findByViews();
  // }

  @Patch(':id/playcounter')
  async playCount(@Param('id') id: number) {
    return await this.musicService.playCount(id);
  }

  @Get('search')
  async findAllSearch(@Query('search') search: string) {
    return await this.musicService.findAllSearch(search);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.musicService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMusicDto: UpdateMusicDto,
  ) {
    return await this.musicService.update(+id, updateMusicDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.musicService.remove(+id);
  }
}
