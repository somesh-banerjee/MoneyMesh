import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) { }

  @Mutation(() => String)
  async login(@Args('email') email: string, @Args('password') password: string) {
    const { accessToken } = await this.authService.login(email, password);
    return accessToken;
  }
}
