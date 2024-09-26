import { Module } from '@nestjs/common';
import { ListenersService } from './listeners.service';
import { ListenersController } from './listeners.controller';
import { ListenerEntity } from './entities/listener.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListenersRepository } from './listeners.repository';
import { AlbumModule } from 'src/album/album.module';

@Module({
  imports: [TypeOrmModule.forFeature([ListenerEntity]),AlbumModule],
  controllers: [ListenersController],
  providers: [ListenersService, ListenersRepository],
  exports: [TypeOrmModule, ListenersService],
})
export class ListenersModule {}
