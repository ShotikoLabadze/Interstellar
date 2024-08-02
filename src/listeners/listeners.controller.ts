import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateListenerDto } from './dto/create-listener.dto';
import { UpdateListenerDto } from './dto/update-listener.dto';
import { ListenerService } from './listeners.service';

@Controller('listeners')
export class ListenersController {
  constructor(private readonly listenerService: ListenerService) {}

  @Post()
  async create(@Body() createListenerDto: CreateListenerDto) {
    return this.listenerService.create(createListenerDto);
  }

  @Get()
  async findAll() {
    return this.listenerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.listenerService.findOne(parseInt(id, 10));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateListenerDto: UpdateListenerDto,
  ) {
    return this.listenerService.update(parseInt(id, 10), updateListenerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.listenerService.remove(parseInt(id, 10));
  }
}
