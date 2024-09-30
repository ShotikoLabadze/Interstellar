import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserRepository } from 'src/user/user.repository';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Authorization token is missing.');
    }

    let payload;
    try {
      payload = await this.jwtService.verifyAsync(token);
      request.user = payload; // Directly set the user payload
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token.');
    }

    const user: UserEntity = await this.userRepository.findOne(payload.userId);
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    // Check if user is blocked
    if (user.blocked) {
      throw new ForbiddenException('User account is blocked.');
    }

    request.user.isAdmin = user.isAdmin; // Set isAdmin on the request object

    return true; 
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) return undefined;

    const [type, token] = authorizationHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
