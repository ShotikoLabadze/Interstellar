import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
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
      throw new ForbiddenException('Your account is blocked. Please contact support.');
    }

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    // Create JWT token
    const payload = {
      userId: user.id,
      email: user.email,
    };

    const jwtToken = await this.jwtService.signAsync(payload);

     // Check if user is admin
     const adminEmails = this.configService.get<string>('ADMIN_EMAILS')?.split(',');
     const role = adminEmails.includes(user.email) ? 'admin' : 'user';

    // Return the JWT token and user info
    return {
      accessToken: jwtToken,
      name: user.name,
      email: user.email,
      id: user.id,
      role: role,
    };
  }
}
