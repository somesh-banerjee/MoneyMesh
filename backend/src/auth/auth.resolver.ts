import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Throttle } from '@nestjs/throttler';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) { }

  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @Mutation(() => String)
  async login(@Args('email') email: string, @Args('password') password: string) {
    const { accessToken } = await this.authService.login(email, password);
    return accessToken;
  }
}
