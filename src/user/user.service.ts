import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaylistEntity } from 'src/playlist/entities/playlist.entity';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { encodePassword } from 'src/utils/bcrypt';
import { UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @InjectRepository(PlaylistEntity)
    private readonly playlistRepository: Repository<PlaylistEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
  }

  async findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }

  //blocking users

  async blockUsers(ids: number[]): Promise<{ message: string[] }> {
    const messages = [];

    for (const id of ids) {
      const result: UpdateResult = await this.userRepository.update(id, {
        blocked: true,
      });

      if (result.affected === 0) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      messages.push(`User with ID ${id} has been blocked.`);
    }

    return { message: messages };
  }

  //unblocking users

  async unblockUsers(ids: number[]): Promise<{ message: string[] }> {
    const messages = [];

    for (const id of ids) {
      const result: UpdateResult = await this.userRepository.update(id, {
        blocked: false,
      });

      if (result.affected === 0) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      messages.push(`User with ID ${id} has been unblocked.`);
    }

    return { message: messages };
  }

  //deleting users

  async deleteUsers(ids: number[]): Promise<{ message: string[] }> {
    const messages: string[] = [];

    for (const id of ids) {
      try {
        const user = await this.userRepository.remove(id);
        messages.push(`User with ID ${user.id} has been deleted.`);
      } catch (error) {
        if (error.message.includes('not found')) {
          messages.push(`User with ID ${id} was not found.`);
        } else {
          throw error;
        }
      }
    }

    return { message: messages };
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: number): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }
}
