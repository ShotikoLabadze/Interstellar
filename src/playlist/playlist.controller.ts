import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file')) 
  async create(@UploadedFile() file: Express.Multer.File,@Body() createPlaylistDto: CreatePlaylistDto) {
    const { userId } = createPlaylistDto;
    if(!userId){
      throw new Error('User Id is required')
    }
    return await this.playlistService.create(file,createPlaylistDto , userId)
}


  @Get()
  async findAll() {
    return await this.playlistService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.playlistService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return await this.playlistService.update(+id, updatePlaylistDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.playlistService.remove(+id);
  }
}