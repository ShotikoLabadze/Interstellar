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
    const canActivate = await super.canActivate(context); // Call the AuthGuard

    if (!canActivate) {
      return false; // If the auth guard fails, deny access
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // The user object is set by AuthGuard

    if (!user?.isAdmin) {
      throw new ForbiddenException('Access denied: Admins only');
    }

    return true; // Allow access if user is admin
  }
}
