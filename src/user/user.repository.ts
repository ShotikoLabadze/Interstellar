import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
        return 'mail already exists';
      }
    }
  }

  async findAll() {
    return await this.userRepository.createQueryBuilder('user').getMany();
  }

  async findOne(email: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
    return await user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const result = await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set(updateUserDto)
      .where('id = :id', { id })
      .execute();
    if (result.affected === 0) {
      throw new Error(`User with ID ${id} not found`);
    }
  }

  async remove(id: number) {
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
}
