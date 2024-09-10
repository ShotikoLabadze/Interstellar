import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { Repository } from "typeorm";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";
import { PlaylistEntity } from "./entities/playlist.entity";
import { UserEntity } from "src/user/entities/user.entity";

@Injectable()
export class PlaylistRepository{
    constructor(@InjectRepository(PlaylistEntity)
              private playlistRepository: Repository<PlaylistEntity>){}

              async create(createPlaylistDto: CreatePlaylistDto, user: UserEntity){
                const playlist = this.playlistRepository.create({
                  ...createPlaylistDto,
                    user: user });
                return await this.playlistRepository.save(playlist);
                
            }

            // async create(createPlaylistDto: CreatePlaylistDto) {
            //   const playlist = this.playlistRepository.create({
            //       ...createPlaylistDto,
            //       user: createPlaylistDto.user
            //   });
            //   return await this.playlistRepository.save(playlist);
          
            
              async findAll() {
              return  await this.playlistRepository
                           .createQueryBuilder('playlist')
                           .leftJoinAndSelect('playlist.user', 'user')
                           .orderBy('playlist.createdAt', 'DESC')
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
            
              // async findOne(id: number): Promise<PlaylistEntity>{
              //   const playlist = await this.playlistRepository
              //              .createQueryBuilder('playlist')
              //              .leftJoinAndSelect('playlist.user', 'user')
              //              .where('playlist.id = :id', { id })
              //              .getOne();

              //              if (!playlist) {
              //               throw new NotFoundException(`Playlist with ID ${id} not found`);
              //           }
                    
              //           return playlist;

              // }
              async findOne(id: number): Promise<PlaylistEntity> {
                const playlist = await this.playlistRepository.findOne({
                    where: { id },
                    relations: ['user'],
                });
            
                if (!playlist) {
                    throw new NotFoundException(`Playlist with ID ${id} not found`);
                }
            
                return playlist;
            }
            
              async update(id: number, updatePlaylistDto: Partial<PlaylistEntity>) {
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