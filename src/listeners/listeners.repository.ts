import { Injectable } from '@nestjs/common';
import { CreateListenerDto } from './dto/create-listener.dto';
import { UpdateListenerDto } from './dto/update-listener.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ListenerEntity } from './entities/listener.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { MusicEntity } from 'src/music/entities/music.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';

@Injectable()
export class ListenersRepository {
  constructor(
    @InjectRepository(ListenerEntity)
    private listenerRepository: Repository<ListenerEntity>,
  ) {}

  async create(createListenerDto: CreateListenerDto): Promise<ListenerEntity> {
    const listener = this.listenerRepository.create(createListenerDto);

    listener.user = { id: createListenerDto.userId } as UserEntity;
    listener.music = { id: createListenerDto.musicId } as MusicEntity;
    listener.album = { id: createListenerDto.albumId } as AlbumEntity;

    return await this.listenerRepository.save(listener);
  }

  async findAll() {
    return await this.listenerRepository
      .createQueryBuilder('listeners')
      .getMany();
  }

  async findOne(id: number) {
    return await this.listenerRepository
      .createQueryBuilder('listeners')
      .leftJoinAndSelect('listeners.user', 'user')
      .leftJoinAndSelect('listeners.music', 'music')
      .leftJoinAndSelect('listeners.album', 'album')
      .where('listeners.id = :id', { id })
      .getOne();
  }

  async update(id: number, updateListenerDto: UpdateListenerDto) {
    await this.listenerRepository
      .createQueryBuilder('listeners')
      .update()
      .set(updateListenerDto)
      .where('id = :id', { id })
      .execute();

    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.listenerRepository.softDelete(id);
    console.log('listener removed')
    return await this.listenerRepository
      .createQueryBuilder('listeners')
      .withDeleted()
      .where('listeners.id = :id', { id })
      .getOne();
  }
}
