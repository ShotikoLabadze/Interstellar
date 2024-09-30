import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Repository } from 'typeorm';
import { PlaylistEntity } from './entities/playlist.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { MusicEntity } from 'src/music/entities/music.entity';

@Injectable()
export class PlaylistRepository {
  constructor(
    @InjectRepository(PlaylistEntity)
    private readonly playlistRepository: Repository<PlaylistEntity>,
    @InjectRepository(MusicEntity)
    private readonly musicRepository: Repository<MusicEntity>
  ) {}

  async create(createPlaylistDto: CreatePlaylistDto, user: UserEntity) {
    const playlist = this.playlistRepository.create({
      ...createPlaylistDto,
      user,
    });

    if (createPlaylistDto.musicIds && createPlaylistDto.musicIds.length > 0) {
      const musics = await this.musicRepository.findByIds(createPlaylistDto.musicIds);
      playlist.musics = musics;
    }

    return await this.playlistRepository.save(playlist);

    }

  async findAll() {
    return await this.playlistRepository.find({
      relations: ['user', 'musics'],
    });
  }

  async findOne(id: number) {
    const playlist = await this.playlistRepository.findOne({
      where: { id },
      relations: ['user', 'musics'],
    });

    if (!playlist) {
      throw new NotFoundException(`Playlist with ID ${id} not found`);
    }

    return playlist;
  }

  async findAllSearch(search?: string) {
    if (search) {
      return await this.playlistRepository.find({
        where: { name: search },
        relations: ['user', 'musics'],
      });
    } else {
      return await this.findAll();
    }
  }

async save(playlist: PlaylistEntity){
  return await this.playlistRepository.save(playlist)
}

  async update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    const playlist = await this.findOne(id);
    if (updatePlaylistDto.musicIds && updatePlaylistDto.musicIds.length > 0) {
      const musics = await this.playlistRepository.manager.findByIds(
        MusicEntity,
        updatePlaylistDto.musicIds,
      );
      playlist.musics = musics;
    }

    return await this.playlistRepository.save({
      ...playlist,
      ...updatePlaylistDto,
    });
  }

  async remove(id: number) {
    const result = await this.playlistRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Playlist with ID ${id} not found`);
    }
  }
}
