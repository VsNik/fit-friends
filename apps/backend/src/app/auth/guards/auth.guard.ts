import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { RequestExpress } from "../types/request-express";
import { UNAUTHORIZED_ERROR } from "@fit-friends/libs/validation";

@Injectable()
export class AuthGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean  {
        const request = context.switchToHttp().getRequest<RequestExpress>();
        if (request.user) {
            return true;
        }

        throw new UnauthorizedException(UNAUTHORIZED_ERROR);
    }
}