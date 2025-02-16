import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput, UserModel } from './user.model';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards/auth.guard';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query(() => UserModel)
  async getUser(
    @Args('id', { nullable: true }) id?: string,
    @Args('email', { nullable: true }) email?: string
  ): Promise<UserModel> {
    if (!id && !email) {
      throw new Error('You must provide either an ID or an email.');
    }

    return await this.userService.findOne({ id, email });
  }

  @Mutation(() => UserModel)
  async register(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  }
}
