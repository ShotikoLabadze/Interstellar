import { Module } from '@nestjs/common';
import { ListenersService } from './listeners.service';
import { ListenersController } from './listeners.controller';
import { ListenerEntity } from './entities/listener.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ListenerEntity])],
  controllers: [ListenersController],
  providers: [ListenersService],
})
export class ListenersModule {}
