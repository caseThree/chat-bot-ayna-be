import { BadRequestException, createParamDecorator } from '@nestjs/common';

export const GetUserName = createParamDecorator((data, ctx): string => {
  const username = ctx.switchToHttp().getRequest()?.user?.username;
  if (!username) throw new BadRequestException();
  return username;
});
