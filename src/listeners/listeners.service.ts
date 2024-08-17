import { Injectable } from '@nestjs/common';
import { ListenerRepository } from './listeners.repository';
import { CreateListenerDto } from './dto/create-listener.dto';
import { UpdateListenerDto } from './dto/update-listener.dto';
import { ListenerEntity } from './entities/listener.entity';

@Injectable()
export class ListenerService {
  constructor(private readonly listenerRepository: ListenerRepository) {}

  async create(createListenerDto: CreateListenerDto): Promise<ListenerEntity> {
    return this.listenerRepository.create(createListenerDto);
  }

  async findAll(): Promise<ListenerEntity[]> {
    return this.listenerRepository.findAll();
  }

  async findOne(id: number): Promise<ListenerEntity> {
    return this.listenerRepository.findOne(id);
  }

  async update(
    id: number,
    updateListenerDto: UpdateListenerDto,
  ): Promise<ListenerEntity> {
    return this.listenerRepository.update(id, updateListenerDto);
  }

  async remove(id: number): Promise<ListenerEntity> {
    return this.listenerRepository.remove(id);
  }
}
