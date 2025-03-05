import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AccountModel, CreateAccountInput, UpdateAccountInput } from "./account.model";
import { AccountService } from "./account.service";
import { JwtPayload } from "src/shared/decorators/jwt-payload.decorator";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/shared/guards/auth.guard";

@Resolver(() => AccountModel)
@UseGuards(JwtAuthGuard)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) { }

  @Query(() => AccountModel, { name: 'account' })
  async getAccount(
    @JwtPayload('id') userId: string,
    @Args('id') id: string
    ): Promise<AccountModel> {
    return await this.accountService.findOne(id, userId);
  }

  @Query(() => [AccountModel], { name: 'accounts' })
  async getAccounts(
    @JwtPayload('id') userId: string,
    @Args('orderBy', { defaultValue: 'created_at' }) orderBy: 'name' | 'type' | 'balance' | 'currency' | 'created_at' | 'updated_at',
    @Args('orderDirection', { defaultValue: 'desc' }) orderDirection: 'asc' | 'desc',
    @Args('limit', { defaultValue: 10 }) limit: number,
    @Args('offset', { defaultValue: 0 }) offset: number
    ): Promise<AccountModel[]> {
    return await this.accountService.findAll({userId, orderBy, orderDirection, limit, offset});
  }

  @Mutation(() => AccountModel, { name: 'createAccount' })
  async createAccount(
    @JwtPayload('id') userId: string,
    @Args('createAccountInput') createAccountInput: CreateAccountInput
    ): Promise<AccountModel> {
    return await this.accountService.create(createAccountInput, userId);
  }

  @Mutation(() => AccountModel, { name: 'updateAccount' })
  async updateAccount(
    @JwtPayload('id') userId: string,
    @Args('id') id: string,
    @Args('updateAccountInput') updateAccountInput: UpdateAccountInput
    ): Promise<AccountModel> {
    return await this.accountService.update(id, updateAccountInput, userId);
  }

  @Mutation(() => AccountModel, { name: 'deleteAccount' })
  async deleteAccount(
    @JwtPayload('id') userId: string,
    @Args('id') id: string
    ): Promise<AccountModel> {
    return await this.accountService.delete(id, userId);
  }
}