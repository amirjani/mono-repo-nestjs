import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from '../users/models/user.schema';

interface RequestWithUser extends Request {
  user: UserDocument;
}

const getCurrentUserByContext = (ctx: ExecutionContext): UserDocument => {
  const request = ctx.switchToHttp().getRequest<RequestWithUser>();

  return request.user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => getCurrentUserByContext(ctx),
);
