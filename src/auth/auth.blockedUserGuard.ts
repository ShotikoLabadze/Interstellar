import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BlockedUserGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;

    const user = await this.userService.findOne(userId);

    if (user.blocked) {
      throw new ForbiddenException('User account is blocked.');
    }

    return true;
  }
}
