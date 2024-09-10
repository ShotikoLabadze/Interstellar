import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  // @Post()
  // async create(@Body() createPlaylistDto: CreatePlaylistDto , @Req() req: any) {
  //   return await this.playlistService.create(createPlaylistDto , req.userId);
  // }


  @Post()
  async create(@Body() createPlaylistDto: CreatePlaylistDto) {
    const { userId } = createPlaylistDto;
    if(!userId){
      throw new Error('User Id is required')
    }
    return await this.playlistService.create(createPlaylistDto , userId);
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

