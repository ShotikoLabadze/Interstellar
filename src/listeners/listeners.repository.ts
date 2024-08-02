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
    private listenerRepository: Repository<ListenerEntity>,
  ) {}

  async create(createListenerDto: CreateListenerDto) {
    const listener = this.listenerRepository.create(createListenerDto);
    return await this.listenerRepository.save(listener);
  }

  async findAll() {
    return await this.listenerRepository.find();
  }

  async findOne(id: number) {
    return await this.listenerRepository
      .createQueryBuilder('listener')
      .where('listener.id = :id', { id })
      .getOne();
  }

  async update(id: number, updateListenerDto: UpdateListenerDto) {
    await this.listenerRepository.update(id, updateListenerDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.listenerRepository.softDelete(id);
    return this.findOne(id);
  }
}
