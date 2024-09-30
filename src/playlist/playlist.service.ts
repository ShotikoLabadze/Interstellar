import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistRepository } from './playlist.repository';
import { UserRepository } from 'src/user/user.repository';
import { PlaylistEntity } from './entities/playlist.entity';
import { MusicRepository } from 'src/music/music.repository';

@Injectable()
export class PlaylistService {
  constructor(
    private readonly playlistRepository: PlaylistRepository,
    private readonly userRepository: UserRepository,
    private readonly musicRepository: MusicRepository,
  ) {}

  async create(createPlaylistDto: CreatePlaylistDto, userId: number) {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    return await this.playlistRepository.create(createPlaylistDto, user);
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

    return await this.playlistRepository.update(id, updatePlaylistDto);
  }
  async addMusicToPlaylist(playlistId: number, musicId: number) {
    const playlist = await this.playlistRepository.findOne(playlistId);
    if (!playlist) {
      throw new NotFoundException(`Playlist with ID ${playlistId} not found`);
    }

    const music = await this.musicRepository.findOne(musicId);
    if (!music) {
      throw new NotFoundException(`Music with ID ${musicId} not found`);
    }


    if (!playlist.musics) {
      playlist.musics = [];
    }


    if (!playlist.musics.some(existingMusic => existingMusic.id === musicId)) {
      playlist.musics.push(music);
      await this.playlistRepository.save(playlist); 
    }

    return playlist;
  }

  async remove(id: number) {
    return await this.playlistRepository.remove(id);
  }
}
