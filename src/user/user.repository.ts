import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    newUser.password = await bcrypt.hash(newUser.password, 10);

    try {
      const result = await this.userRepository.save(newUser);
      const { password, ...user } = result;
      return user;
    } catch (err) {
      if (err.errno == 1062) {
        return;
      }
    }
  }

  async blockUser(userId: number) {
    await this.userRepository.update(userId, { blocked: true });
  }

  async unblockUser(userId: number) {
    await this.userRepository.update(userId, { blocked: false });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .orderBy('user.createdAt', 'DESC')
      .leftJoinAndSelect('user.playlists', 'playlist')
      .getMany();
  }

  async findOne(id: number): Promise<UserEntity | null> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.playlists', 'playlist')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    //check if password is updated
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    const result = await this.userRepository
      .createQueryBuilder()
      .update(UserEntity)
      .set(updateUserDto)
      .where('id = :id', { id })
      .execute();

    return result;
  }

  async findOneByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async remove(id: number): Promise<UserEntity | null> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    await this.userRepository.softDelete(id);
    return user;
  }

  async findByIds(ids: number[]): Promise<UserEntity[]> {
    return this.userRepository.findBy({ id: In(ids) });
  }
}
