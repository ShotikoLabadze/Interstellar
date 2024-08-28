import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListenerEntity } from './entities/listener.entity';
import { CreateListenerDto } from './dto/create-listener.dto';
import { UpdateListenerDto } from './dto/update-listener.dto';

@Injectable()
export class ListenersService {
  constructor(
    @InjectRepository(ListenerEntity) // Change to ListenersEntity
    private listenerRepository: Repository<ListenerEntity>, // Change to ListenersEntity
  ) {}

  async create(
    createListenerDto: CreateListenerDto, // Change to CreateListenersDto
  ): Promise<ListenerEntity> {
    const listener = this.listenerRepository.create(createListenerDto);
    return this.listenerRepository.save(listener);
  }

  async findAll(): Promise<ListenerEntity[]> {
    return this.listenerRepository.find({
      relations: ['user', 'music', 'album'],
    });
  }

  async findOne(id: number): Promise<ListenerEntity> {
    return this.listenerRepository.findOne({
      where: { id },
      relations: ['user', 'music', 'album'],
    });
  }

  async update(
    id: number,
    updateListenerDto: UpdateListenerDto,
  ): Promise<ListenerEntity> {
    await this.listenerRepository.update(id, updateListenerDto);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.listenerRepository.delete(id);
  }
}
