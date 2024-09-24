import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from 'src/user/user.repository';
import { UserEntity } from 'src/user/entities/user.entity';
import { jwtConstants } from './constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
    private configService: ConfigService, // Inject ConfigService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    let payload;
    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request['user'] = payload; 
    } catch {
      throw new UnauthorizedException('Invalid token');
    }

    // Check if user is blocked
    const user: UserEntity = await this.userRepository.findOne(payload.userId);
    if (user?.blocked) {
      throw new UnauthorizedException('User account is blocked');
    }

    // Check if user is admin
    const adminEmails = this.configService.get<string>('ADMIN_EMAILS')?.split(',');
    if (adminEmails.includes(user.email)) {
      request.user.isAdmin = true; // Mark the user as admin in the request object
    } else {
      request.user.isAdmin = false;
    }

    return true; 
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
