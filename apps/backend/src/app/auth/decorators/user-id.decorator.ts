import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { RequestExpress } from "../types/request-express";

export const UserId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestExpress>();
    return request.user;
})