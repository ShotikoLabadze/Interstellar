import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistRepository } from './playlist.repository';

@Injectable()
export class PlaylistService {
  constructor(private readonly playlistRepository: PlaylistRepository){}

  async create(createPlaylistDto: CreatePlaylistDto) {
    return await this.playlistRepository.create(createPlaylistDto);
  }

  async findAll() {
    return await this.playlistRepository.findAll();
  }

  async findAllSearch(search?: string) {
    return await this.playlistRepository.findAllSearch(search);
  }

  async findOne(id: number) {
    return await this.playlistRepository.findOne(id);
  }

  async update(id: number, updateMusicDto: UpdatePlaylistDto) {
    return await this.playlistRepository.update(id, updateMusicDto);
  }

  async remove(id: number) {
    return await this.playlistRepository.remove(id);
  }
}