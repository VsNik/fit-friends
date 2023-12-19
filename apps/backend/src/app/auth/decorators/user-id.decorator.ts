import { RequestExpress } from '@fit-friends/libs/types';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UserId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<RequestExpress>();
  return request.user;
});
