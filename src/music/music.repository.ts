import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';

@Injectable()
export class MusicRepository {
  private musics = [];

  create(createMusicDto: CreateMusicDto) {
    const newMusic = { id: this.musics.length + 1, ...createMusicDto };
    this.musics.push(newMusic);
    return newMusic;
  }

  findAll(search?: string) {
    if (search) {
      return this.musics.filter(
        (music) => music.name.includes(search) || music.url.includes(search),
      );
    }
    return this.musics;
  }

  findOne(id: number) {
    for (let i = 0; i < this.musics.length; i++) {
      if (this.musics[i].id === Number(id)) {
        return this.musics[i];
      }
    }
    return 'error';
  }

  update(id: number, updateMusicDto: UpdateMusicDto) {
    for (let i = 0; i < this.musics.length; i++) {
      if (this.musics[i].id === Number(id)) {
        const updatedMusics = { ...this.musics[i], ...updateMusicDto };
        this.musics[i] = updatedMusics;
        return updatedMusics;
      }
    }
    return 'error';
  }

  remove(id: number) {
    for (let i = 0; i < this.musics.length; i++) {
      if (this.musics[i].id === Number(id)) {
        const [removedMusics] = this.musics.splice(i, 1);
        return removedMusics;
      }
    }
    return 'error';
  }
}
