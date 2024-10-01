import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}


  @UseGuards(AuthGuard)
  @Post(':id/:musicId')
  async addMusicToPlaylist(
    @Param('id') playlistId: string,
    @Param('musicId') musicId: string,
  ) {
    return await this.playlistService.addMusicToPlaylist(+playlistId, +musicId);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createPlaylistDto: CreatePlaylistDto) {
    const { userId } = createPlaylistDto;
    if (!userId) {
      throw new Error('User ID is required');
    }
    return await this.playlistService.create(createPlaylistDto, userId);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.playlistService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.playlistService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ) {
    return await this.playlistService.update(+id, updatePlaylistDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.playlistService.remove(+id);
  }
}
