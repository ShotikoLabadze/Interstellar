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

    // Check if the user is blocked
    if (user.blocked) {
      throw new ForbiddenException(
        'Your account is blocked. Please contact support.',
      );
    }

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    // Check if the user is an admin
    if (!user.isAdmin) {
      throw new ForbiddenException('Access denied: Admins only');
    }

    // Create JWT token
    const payload = {
      userId: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    const jwtToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '30d', // Adjust token expiration as needed
    });

    // Return the JWT token and user info
    return {
      accessToken: jwtToken,
      name: user.name,
      email: user.email,
      id: user.id,
      role: 'admin', // Since we already checked if the user is an admin
    };
  }
}
