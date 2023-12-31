import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AppError } from '@fit-friends/libs/validation';
import { RequestExpress } from '@fit-friends/libs/types';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestExpress>();
    if (request.user) {
      return true;
    }

    throw new UnauthorizedException(AppError.Unauthorized);
  }
}
