import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicRepository } from './music.repository';

@Injectable()
export class MusicService {
  constructor(private readonly musicRepository: MusicRepository) {}

  create(createMusicDto: CreateMusicDto) {
    return this.musicRepository.create(createMusicDto);
  }
  async findAll() {
    return this.musicRepository.findAll();
  }

  async findAllSearch(search: string) {
    return this.musicRepository.findAll(search);
  }


  findOne(id: number) {
    return this.musicRepository.findOne(id);
  }

  update(id: number, updateMusicDto: UpdateMusicDto) {
    return this.musicRepository.update(id, updateMusicDto);
  }

  remove(id: number) {
    return this.musicRepository.remove(id);
  }
}
