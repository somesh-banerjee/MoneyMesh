import { Args, Query, Resolver } from "@nestjs/graphql";
import { AccountModel } from "./account.model";
import { AccountService } from "./account.service";
import { JwtPayload } from "src/shared/decorators/jwt-payload.decorator";

@Resolver(() => AccountModel)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) { }

  @Query(() => AccountModel, { name: 'account' })
  async getAccount(
    @JwtPayload('id') userId: string,
    @Args('id') id: string
    ): Promise<AccountModel> {
    return await this.accountService.findOne(id, userId);
  }
}