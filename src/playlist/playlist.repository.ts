import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { Like, Repository } from 'typeorm';
import { PlaylistEntity } from './entities/playlist.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { MusicEntity } from 'src/music/entities/music.entity';

@Injectable()
export class PlaylistRepository {
  constructor(
    @InjectRepository(PlaylistEntity)
    private playlistRepository: Repository<PlaylistEntity>,
    @InjectRepository(MusicEntity)
    private musicRepository: Repository<MusicEntity>,
  ) {}

  async create(createPlaylistDto: CreatePlaylistDto, user: UserEntity) {
    const playlist = this.playlistRepository.create({
      ...createPlaylistDto,
      user,
    });

    if (createPlaylistDto.musicIds && createPlaylistDto.musicIds.length > 0) {
      const musics = await this.musicRepository.findByIds(
        createPlaylistDto.musicIds,
      );
      playlist.musics = musics;
    }

    return await this.playlistRepository.save(playlist);
  }

  async findAll() {
    return await this.playlistRepository.find({
      relations: ['user', 'musics'],
      order: { createdAt: 'DESC' },
    });
  }

  async findAllSearch(search?: string) {
    if (search) {
      return await this.playlistRepository.find({
        where: {
          name: Like(`%${search}%`),
        },
        relations: ['musics'],
      });
    }
    return [];
  }

  async findOne(id: number): Promise<PlaylistEntity> {
    const playlist = await this.playlistRepository.findOne({
      where: { id },
      relations: ['user', 'musics'],
    });

    if (!playlist) {
      throw new NotFoundException(`Playlist with ID ${id} not found`);
    }

    return playlist;
  }

  async update(id: number, updatePlaylistDto: Partial<PlaylistEntity>) {
    await this.playlistRepository.update(id, updatePlaylistDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.playlistRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Playlist with ID ${id} not found`);
    }
  }
}
