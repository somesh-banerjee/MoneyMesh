import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query(() => UserModel)
  async getUser(@Args('id') id: string): Promise<UserModel> {
    return await this.userService.findOneById(id);
  }

  @Mutation(() => UserModel)
  async register(@Args('createUserInput') createUserInput: any) {
    return await this.userService.create(createUserInput);
  }
}
