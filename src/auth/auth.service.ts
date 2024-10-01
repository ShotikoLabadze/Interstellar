import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    if (user.blocked) {
      throw new ForbiddenException(
        'Your account is blocked. Please contact support.',
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }
    const isAdmin = user.isAdmin;

    const payload = {
      userId: user.id,
      email: user.email,
      isAdmin,
    };

    const jwtToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '30d', 
    });

    return {
      accessToken: jwtToken,
      name: user.name,
      email: user.email,
      id: user.id,
      role: isAdmin ? 'admin' : 'user',
    };
  }
}
