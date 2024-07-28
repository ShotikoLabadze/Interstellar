import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicRepository } from './music.repository';

@Injectable()
export class MusicService {
  constructor(private readonly musicRepository: MusicRepository) {}

  async create(createMusicDto: CreateMusicDto) {
    return await this.musicRepository.create(createMusicDto);
  }

  async findAll() {
    return await this.musicRepository.findAll();
  }

  async findAllSearch(search?: string) {
    return await this.musicRepository.findAllSearch(search);
  }

  async findOne(id: number) {
    return await this.musicRepository.findOne(id);
  }

  async update(id: number, updateMusicDto: UpdateMusicDto) {
    return await this.musicRepository.update(id, updateMusicDto);
  }

  async remove(id: number) {
    return await this.musicRepository.remove(id);
  }
}