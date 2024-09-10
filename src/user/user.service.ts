import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { encodePassword } from 'src/utils/bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaylistEntity } from 'src/playlist/entities/playlist.entity';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';


@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository,
    @InjectRepository(PlaylistEntity)
    private readonly playlistRepository: Repository<PlaylistEntity>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await encodePassword(createUserDto.password);

    return await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: number): Promise<UserEntity>{
    return this.userRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.remove(id);
  }
}
