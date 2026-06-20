import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class AppThrottlerGuard extends ThrottlerGuard {
  protected getRequestResponse(context: ExecutionContext) {
    if (context.getType() === 'http') {
      const req = context.switchToHttp().getRequest();
      return { req, res: context.switchToHttp().getResponse() };
    }

    const gqlContext = GqlExecutionContext.create(context).getContext();
    return { req: gqlContext.req, res: gqlContext.res };
  }
}
