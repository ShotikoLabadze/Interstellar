import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ListenersService } from './listeners.service';
import { CreateListenerDto } from './dto/create-listener.dto';
import { UpdateListenerDto } from './dto/update-listener.dto';

@Controller('listeners')
export class ListenersController {
  constructor(private readonly listenersService: ListenersService) {}

  @Post()
  async create(@Body() createListenerDto: CreateListenerDto) {
    return await this.listenersService.create(createListenerDto);
  }

  @Get()
  async findAll() {
    return await this.listenersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.listenersService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateListenerDto: UpdateListenerDto,
  ) {
    return await this.listenersService.update(+id, updateListenerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.listenersService.remove(+id);
  }
}
