import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  private users = [];

  create(createUserDto: CreateUserDto) {
    const newUser = { id: this.users.length + 1, ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id) || 'error';
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return 'error';
    }

    this.users[index] = { ...this.users[index], ...updateUserDto };
    return this.users[index];
  }

  remove(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return 'error';
    }

    const removedUser = this.users.splice(index, 1)[0];
    return removedUser;
  }
}
