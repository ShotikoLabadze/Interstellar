import { Module } from '@nestjs/common';
import { ListenerService } from './listeners.service';
import { ListenerRepository } from './listeners.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListenerEntity } from './entities/listener.entity';
import { ListenersController } from './listeners.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ListenerEntity])],
  controllers: [ListenersController],
  providers: [ListenerService, ListenerRepository],
  exports: [ListenerService, ListenerRepository, TypeOrmModule],
})
export class ListenerModule {}
