import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestExpress } from '../types/request-express';
import { Role } from '@fit-friends/libs/types';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UNAUTHORIZED_ERROR } from '@fit-friends/libs/validation';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestExpress>();

    if (!request.role) {
      throw new UnauthorizedException(UNAUTHORIZED_ERROR);
    }

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredRoles) {
      return true;
    }

    const { role } = context.switchToHttp().getRequest();
    return requiredRoles.some((userRole) => role === userRole);
  }
}
