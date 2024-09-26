import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ListenerEntity } from './entities/listener.entity';
import { CreateListenerDto } from './dto/create-listener.dto';
import { UpdateListenerDto } from './dto/update-listener.dto';
import { MusicEntity } from 'src/music/entities/music.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';

@Injectable()
export class ListenersService {
  constructor(
    @InjectRepository(ListenerEntity)
    private listenerRepository: Repository<ListenerEntity>,
    @InjectRepository(MusicEntity)
    private musicRepository: Repository<MusicEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>
  ) {}

  async create(createListenerDto: CreateListenerDto) {
    const listener = this.listenerRepository.create(createListenerDto);

    return await this.listenerRepository.save(listener);
  
}

  async findAll() {
    return await this.listenerRepository.find({
      relations: ['user', 'music', 'album'],
    });
  }

  async findOne(id: number) {
    return await this.listenerRepository.findOne({
      where: { id },
      relations: ['user', 'music', 'album'],
    });
  }

  async update(id: number, updateListenerDto: UpdateListenerDto) {
    await this.listenerRepository.update(id, updateListenerDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.listenerRepository.softDelete(id);
    if (result.affected > 0) {
      return { message: 'Listener successfully deleted.' };
    } else {
      throw new NotFoundException('Listener not found.');
    }
  }
  }
