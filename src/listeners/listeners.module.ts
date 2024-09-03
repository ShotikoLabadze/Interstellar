import { Module } from '@nestjs/common';
import { ListenersService } from './listeners.service';
import { ListenersController } from './listeners.controller';
import { ListenerEntity } from './entities/listener.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListenersRepository } from './listeners.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ListenerEntity])],
  controllers: [ListenersController],
  providers: [ListenersService, ListenersRepository],
  exports: [TypeOrmModule, ListenersService],
})
export class ListenersModule {}
