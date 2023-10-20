import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { RequestExpress } from "../types/request-express";

@Injectable()
export class AuthGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean  {
        const request = context.switchToHttp().getRequest<RequestExpress>();
        if (request.user) {
            return true;
        }

        throw new UnauthorizedException('Unauthorized');
    }
}