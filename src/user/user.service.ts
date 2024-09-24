import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaylistEntity } from 'src/playlist/entities/playlist.entity';
import { Repository } from 'typeorm';
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

  async blockUser(id: number): Promise<{ message: string }> {
    const result: UpdateResult = await this.userRepository.update(id, {
      blocked: true,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return { message: `User with ID ${id} has been blocked.` };
  }

  async unblockUser(id: number): Promise<{ message: string }> {
    const result: UpdateResult = await this.userRepository.update(id, {
      blocked: false,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return { message: `User with ID ${id} has been unblocked.` };
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

  remove(id: number) {
    return this.userRepository.remove(id);
  }
}
