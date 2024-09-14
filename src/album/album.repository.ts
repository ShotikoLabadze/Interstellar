import { Injectable, NotFoundException } from '@nestjs/common';

import { UpdateAlbumDto } from './dto/update-album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MusicEntity } from 'src/music/entities/music.entity';

@Injectable()
export class AlbumRepository {
  constructor(@InjectRepository(AlbumEntity)
              private albumRepository: Repository<AlbumEntity>,
              @InjectRepository(MusicEntity) 
              private musicRepository: Repository<MusicEntity>){}

  async create(createAlbumDto: CreateAlbumDto){
    const { musicIds, ...albumData } = createAlbumDto;
    const album = this.albumRepository.create(albumData);
    
    if (musicIds && musicIds.length > 0) {
      const musics = [];
      for (const id of musicIds) {
          const music = await this.musicRepository.findOne({ where: { id } });
          if (music) {
              musics.push(music);
          }
      }
      album.musics = musics;
  }

  return await this.albumRepository.save(album);
}

  async findAll() {
    return await this.albumRepository
               .createQueryBuilder('album')
               .orderBy('album.createdAt', 'DESC')
               .leftJoinAndSelect('album.musics', 'musics')
               .getMany();
  }

  async findAllSearch(search?: string) {
    if (search) {
      return await this.albumRepository
                 .createQueryBuilder('album')
                 .where('album.title LIKE :name', { name: `%${search}%`})
                 .getMany();
    }
  }

  async findOne(id: number): Promise<AlbumEntity> {
    const album =  await this.albumRepository
               .createQueryBuilder('album')
               .leftJoinAndSelect('album.musics', 'musics')
               .where('album.id = :id', { id })
               .getOne();

               
               if (!album) {
                throw new NotFoundException(`Album with ID ${id} not found`);
            }
        
            return album;
              
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
 
  const { musicIds, ...albumData } = updateAlbumDto;

  await this.albumRepository
              .createQueryBuilder()
              .update()
              .set(albumData)
              .where('id = :id', { id })
              .execute();

              if (musicIds && musicIds.length > 0) {
                const musics = [];
                for (const musicId of musicIds) {
                    const music = await this.musicRepository.findOne({ where: { id: musicId } });
                    if (music) {
                        musics.push(music);
                    }
                }
                const album = await this.findOne(id);
                 if (album) {
                album.musics = musics;
                await this.albumRepository.save(album);
        }
    }
               return await this.findOne(id);
              }
            

  async remove(id: number) {
    await this.albumRepository.softDelete(id);
    return await this.albumRepository
               .createQueryBuilder('album')
               .withDeleted()
               .where('album.id = :id', { id })
               .getOne()
  }

}