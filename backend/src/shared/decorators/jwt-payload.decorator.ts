import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const JwtPayload = createParamDecorator(
  (key: string | undefined, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const jwtPayload = ctx.getContext().jwtPayload;

    return key ? jwtPayload?.[key] : jwtPayload;
  },
);
