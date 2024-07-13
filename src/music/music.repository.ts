import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MusicRepository {
  findAllSearch(search: string) {
    throw new Error('Method not implemented.');
  }
 

constructor(@InjectRepository(Music)
            private musicRepository: Repository<Music>){}

    create(createMusicDto: CreateMusicDto) {
      const music = this.musicRepository.create(createMusicDto)
      return this.musicRepository
                 .save(music)
}

    findAll(search?: string) {
      const query = this.musicRepository.createQueryBuilder('music');
  
      if (search) {
        query.where('music.name LIKE :name', { name: `%${search}%` });
      }
  
      return query.getMany();
    }
  

    findOne(id: number) {
    return  this.musicRepository
                .createQueryBuilder('music')
                .where('music.id = :id', { id })
                .getMany()
  }


    async update(id: number, updateMusicDto: UpdateMusicDto) {
      await this.musicRepository
                .createQueryBuilder('music')
                .update()
                .set(updateMusicDto)
                .where('music.id = :id', { id })
                .execute()
}

    async remove(id: number){
      await this.musicRepository
                .softDelete(id)

    return this.musicRepository
               .createQueryBuilder('music')
               .withDeleted()
               .where('music.id = :id', { id })
               .getOne()
}
}
