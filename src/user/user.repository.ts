import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
     const user = this.userRepository.create(createUserDto);
     return await this.userRepository.save(user);
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

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const result = await this.userRepository
      .createQueryBuilder()
      .update(UserEntity)
      .set(updateUserDto)
      .where('id = :id', { id })
      .execute();
    if (result.affected === 0) {
      throw new Error(`User with ID ${id} not found`);
    } const updatedUser = await this.userRepository
          .createQueryBuilder('user')
          .where('user.id = :id', { id })
          .getOne();
          
  return updatedUser;
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
    console.log('user removed')
    return user;
  }

  async findByIds(ids: number[]): Promise<UserEntity[]> {
    return this.userRepository.findBy({ id: In(ids) });
  }
}