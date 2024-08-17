import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateListenerDto } from './dto/create-listener.dto';
import { UpdateListenerDto } from './dto/update-listener.dto';
import { ListenerEntity } from './entities/listener.entity';

@Injectable()
export class ListenerRepository {
  constructor(
    @InjectRepository(ListenerEntity)
    private readonly listenerRepository: Repository<ListenerEntity>,
  ) {}

  async create(createListenerDto: CreateListenerDto) {
    const listener = this.listenerRepository.create(createListenerDto);
    return await this.listenerRepository.save(listener);
  }

  async findAll() {
    return await this.listenerRepository.find({
      relations: ['album', 'music'],
    });
  }

  async findOne(id: number) {
    const listener = await this.listenerRepository
      .createQueryBuilder('listener')
      .leftJoinAndSelect('listener.album', 'album')
      .leftJoinAndSelect('listener.music', 'music')
      .where('listener.id = :id', { id })
      .getOne();

    console.log('Found listener:', listener);

    return listener;
  }

  async update(id: number, updateListenerDto: UpdateListenerDto) {
    await this.listenerRepository.update(id, updateListenerDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.listenerRepository.softDelete(id);
    return await this.listenerRepository
      .createQueryBuilder('listener')
      .withDeleted()
      .leftJoinAndSelect('listener.album', 'album')
      .leftJoinAndSelect('listener.music', 'music')
      .where('listener.id = :id', { id })
      .getOne();
  }
}
