import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Injectable()
export class AdminGuard extends AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = await super.canActivate(context); 

    if (!canActivate) {
      return false; 
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; 

    if (!user?.isAdmin) {
      throw new ForbiddenException('Access denied: Admins only');
    }

    return true; 
  }
}
