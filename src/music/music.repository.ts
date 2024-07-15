import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MusicRepository {

constructor(@InjectRepository(Music)
            private musicRepository: Repository<Music>){}

     create(createMusicDto: CreateMusicDto) {
         const music = this.musicRepository.create(createMusicDto);
          return this.musicRepository
                   .save(music);
    }

    findAll(){
      return this.musicRepository
                 .createQueryBuilder('music')
                 .getMany()
     }

     findAllSearch(search?: string) {
     if(search){
        return this.musicRepository
                   .createQueryBuilder('music')
                   .where('music.name LIKE :name', { name: `%${search}%`})
                   .getMany()

      } else {
        return this.musicRepository.find();
      }
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
