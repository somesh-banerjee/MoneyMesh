import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput, UserModel } from './user.model';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards/auth.guard';
import { JwtPayload } from 'src/shared/decorators/jwt-payload.decorator';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query(() => UserModel, { name: 'user' })
  @UseGuards(JwtAuthGuard)
  async getUser(
    @JwtPayload('id') userId: any
  ): Promise<UserModel> {
    return await this.userService.findOne({ id: userId });
  }

  @Mutation(() => UserModel, { name: 'register' })
  async register(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  }
}
