import { Injectable } from '@nestjs/common';
import { ListenerRepository } from './listeners.repository';
import { CreateListenerDto } from './dto/create-listener.dto';
import { UpdateListenerDto } from './dto/update-listener.dto';

@Injectable()
export class ListenerService {
  constructor(private readonly listenerRepository: ListenerRepository) {}

  async create(createListenerDto: CreateListenerDto) {
    return this.listenerRepository.create(createListenerDto);
  }

  async findAll() {
    return this.listenerRepository.findAll();
  }

  async findOne(id: number) {
    return this.listenerRepository.findOne(id);
  }

  async update(id: number, updateListenerDto: UpdateListenerDto) {
    return this.listenerRepository.update(id, updateListenerDto);
  }

  async remove(id: number) {
    return this.listenerRepository.remove(id);
  }
}
