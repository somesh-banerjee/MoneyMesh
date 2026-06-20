import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

const resolveJwtPayload = (context: ExecutionContext) => {
  if (context.getType() === 'http') {
    const request = context.switchToHttp().getRequest();
    return request.jwtPayload ?? request.user;
  }

  return GqlExecutionContext.create(context).getContext().jwtPayload;
};

export const JwtPayload = createParamDecorator(
  (key: string | undefined, context: ExecutionContext) => {
    const jwtPayload = resolveJwtPayload(context);

    if (key === 'id') {
      return jwtPayload?.id ?? jwtPayload?.sub;
    }

    return key ? jwtPayload?.[key] : jwtPayload;
  },
);
