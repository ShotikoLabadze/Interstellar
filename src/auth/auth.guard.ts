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
      request.user = payload; 
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token.');
    }

    const userId = payload?.userId;
    if (!userId) {
      throw new UnauthorizedException('User ID not found in token payload.');
    }

    const user: UserEntity = await this.userRepository.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    if (user.blocked) {
      throw new ForbiddenException('User account is blocked.');
    }

    request.user.isAdmin = user.isAdmin;

    return true; 
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) return undefined;

    const [type, token] = authorizationHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
