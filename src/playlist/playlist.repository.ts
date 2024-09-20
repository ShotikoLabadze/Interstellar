import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { Repository } from 'typeorm';
import { PlaylistEntity } from './entities/playlist.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { FileEntity } from 'src/files/entities/file.entity';

@Injectable()
export class PlaylistRepository {
  constructor(
    @InjectRepository(PlaylistEntity)
    private playlistRepository: Repository<PlaylistEntity>,
  ) {}

  async create(file:FileEntity,createPlaylistDto: CreatePlaylistDto, user: UserEntity) {
    const playlist = this.playlistRepository.create({
      ...createPlaylistDto,
      user: user,
      files: [file],
    });
    return await this.playlistRepository.save(playlist);
  }

  async findAll() {
    return await this.playlistRepository.find({
      relations:['user', 'files'],
      order:{ createdAt:'DESC'}
    })
  }

  async findAllSearch(search?: string) {
    if (search) {
      return await this.playlistRepository
        .createQueryBuilder('playlist')
        .where('name LIKE :search', { search: `%${search}%` })
        .getMany();
    } else {
      return await [];
    }
  }

  async findOne(id: number): Promise<PlaylistEntity> {
    const playlist = await this.playlistRepository
      .createQueryBuilder('playlist')
      .leftJoinAndSelect('playlist.user', 'user')
      .leftJoinAndSelect('playlist.files','files')
      .where('playlist.id = :id', { id })
      .getOne();

    if (!playlist) {
      throw new NotFoundException(`Playlist with ID ${id} not found`);
    }

    return playlist;
  }

  async update(id: number, updatePlaylistDto: Partial<PlaylistEntity>) {
    await this.playlistRepository
      .createQueryBuilder('playlist')
      .update()
      .set(updatePlaylistDto)
      .where('id = :id', { id })
      .execute();

    return this.findOne(id);
  }

  async remove(id: number) {
    // await this.playlistRepository.softDelete(id);
    console.log('playlist removed')
    return await this.playlistRepository
      .createQueryBuilder('playlist')
      .withDeleted()
      .where('playlist.id = :id', { id })
      .getOne();
  }
}
