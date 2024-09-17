import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistRepository } from './playlist.repository';
import { UserRepository } from 'src/user/user.repository';
import { PlaylistEntity } from './entities/playlist.entity';
import { MusicRepository } from 'src/music/music.repository';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class PlaylistService {
  constructor(private readonly playlistRepository: PlaylistRepository,
              private readonly userRepository: UserRepository,
              private readonly fileService: FilesService,){}

  async create(file,createPlaylistDto: CreatePlaylistDto , userId: number) {
    if (!userId) {
      throw new Error('User ID is required');
  }
  const user = await this.userRepository.findOne(userId);
    if(!user){
      throw new Error(`User with ID ${userId} not found`)
    }
    const res = await this.fileService.uploadFile(file);
    const playlist = await this.playlistRepository.create(res,createPlaylistDto,user);
    return playlist
  }
 

  async findAll() {
    return await this.playlistRepository.findAll();
  }

  async findAllSearch(search?: string) {
    return await this.playlistRepository.findAllSearch(search);
  }


  async findOne(id: number): Promise<PlaylistEntity> {
    const playlist = await this.playlistRepository.findOne(id);

    if (!playlist) {
        throw new NotFoundException(`Playlist with ID ${id} not found`);
    }

    return playlist;
}


  async update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    const playlist = await this.playlistRepository.findOne(id);
    if (!playlist) {
      throw new NotFoundException(`Playlist with ID ${id} not found`);
    }

    if (updatePlaylistDto.userId !== undefined) {
      const user = await this.userRepository.findOne(updatePlaylistDto.userId);
      if (!user) {
        throw new NotFoundException(`User with ID ${updatePlaylistDto.userId} not found`);
      }
      playlist.user = user;
    }
  

    return await this.playlistRepository.update(id, playlist);
  }



  async remove(id: number) {
    return await this.playlistRepository.remove(id);
  }
}