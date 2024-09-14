import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserRepository } from 'src/user/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.findOneByEmail(email);
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const payload = {
          userId: user.id,
          email: user.email,
        };

        const jwtToken = await this.jwtService.signAsync(payload);

        return {
          accessToken: jwtToken,
          name: user.name,
          email: user.email,
          id: user.id,
          role: 'user',
        };
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException();
    }
  }
}