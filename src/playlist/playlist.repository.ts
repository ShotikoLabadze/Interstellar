import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { Repository } from "typeorm";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";
import { PlaylistEntity } from "./entities/playlist.entity";

@Injectable()
export class PlaylistRepository{
    constructor(@InjectRepository(PlaylistEntity)
              private playlistRepository: Repository<PlaylistEntity>){}

              async create(createPlaylistDto: CreatePlaylistDto){
                const playlist = this.playlistRepository.create(createPlaylistDto)
                return await this.playlistRepository.save(playlist)
              }
            
              async findAll() {
                return await this.playlistRepository
                           .createQueryBuilder('playlist')
                           .getMany();
              }
            
              async findAllSearch(search?: string) {
                if (search) {
                  return await this.playlistRepository
                             .createQueryBuilder('playlist')
                             .where('name LIKE :search', { search: `%${search}%`})
                             .getMany();
                }else {
                    return await [];
                }
            }
            
              async findOne(id: number) {
                return await this.playlistRepository
                           .createQueryBuilder('playlist')
                           .where('playlist.id = :id', { id })
                           .getOne();
              }
            
              async update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
                await this.playlistRepository
                          .createQueryBuilder('playlist')
                          .update()
                          .set(updatePlaylistDto)
                          .where('id = :id', { id })
                          .execute()
            
                return this.findOne(id)
              }
            
              async remove(id: number) {
                await this.playlistRepository.softDelete(id);
                return await this.playlistRepository
                           .createQueryBuilder('playlist')
                           .withDeleted()
                           .where('playlist.id = :id', { id })
                           .getOne()
              }
}