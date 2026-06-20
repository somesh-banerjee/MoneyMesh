import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest();
    }

    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    if (!request) {
      throw new UnauthorizedException('Request not found in context');
    }

    return request;
  }

  handleRequest(err: any, user: any, _info: any, context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    if (context.getType() === 'http') {
      const request = context.switchToHttp().getRequest();
      request.user = user;
      request.jwtPayload = user;
    } else {
      const ctx = GqlExecutionContext.create(context);
      ctx.getContext().jwtPayload = user;
    }

    return user;
  }
}
