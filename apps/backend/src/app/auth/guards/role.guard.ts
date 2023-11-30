import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppError } from '@fit-friends/libs/validation';
import { RequestExpress } from '@fit-friends/libs/types';
import { Role } from '@fit-friends/shared';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestExpress>();

    if (!request.role) {
      throw new UnauthorizedException(AppError.Unauthorized);
    }

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredRoles) {
      return true;
    }

    const { role } = context.switchToHttp().getRequest();
    return requiredRoles.some((userRole) => role === userRole);
  }
}
