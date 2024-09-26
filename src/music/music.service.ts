import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicRepository } from './music.repository';
import { MusicEntity } from './entities/music.entity';
import { FilesService } from 'src/files/files.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { ListenersRepository } from 'src/listeners/listeners.repository';

@Injectable()
export class MusicService {
  constructor(
    private readonly fileService: FilesService,
    private readonly musicRepository: MusicRepository,
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>, 
    private readonly listenerRepostory: ListenersRepository

  ) {}

  async create(file, createMusicDto: CreateMusicDto) {
    const res = await this.fileService.uploadFile(file);
    const album = await this.albumRepository.findOne({ where: { id: createMusicDto.albumId } });
    if (!album) {
      throw new NotFoundException(`Album with ID ${createMusicDto.albumId} not found`);
    }

    return await this.musicRepository.create(res, createMusicDto, album);
  ;
  }

  async findAll() {
    return await this.musicRepository.findAll();
  }
  
  async findAllSearch(search?: string) {
    return await this.musicRepository.findAllSearch(search);
  }

  async findOne(id: number , userId: number): Promise<MusicEntity> {
    await this.listenerRepostory.create({musicId: id ,userId:userId })
    return await this.musicRepository.findOne(id);
  }

  async update(id: number, updateMusicDto: UpdateMusicDto) {
    return await this.musicRepository.update(id, updateMusicDto);
  }

  async remove(id: number) {
    return await this.musicRepository.remove(id);
  }
}
