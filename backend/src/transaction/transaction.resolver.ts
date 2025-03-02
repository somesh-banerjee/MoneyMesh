import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateTransactionInput, TransactionModel } from "./transaction.model";
import { JwtPayload } from "src/shared/decorators/jwt-payload.decorator";
import { TransactionService } from "./transaction.service";
import { JwtAuthGuard } from "src/shared/guards/auth.guard";
import { UseGuards } from "@nestjs/common";

@Resolver(() => TransactionModel)
@UseGuards(JwtAuthGuard)
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) { }

  @Query(() => [TransactionModel], { name: 'transactions' })
  async getTransactions(
    @JwtPayload('id') userId: string,
    @Args('accountId') accountId: string
  ) {
    return await this.transactionService.findAll(userId, accountId);
  }

  @Query(() => TransactionModel, { name: 'transaction' })
  async getTransaction(
    @JwtPayload('id') userId: string,
    @Args('id') id: string
  ) {
    return await this.transactionService.findOne(id, userId);
  }

  @Mutation(() => TransactionModel, { name: 'createTransaction' })
  async createTransaction(
    @JwtPayload('id') userId: string,
    @Args('createTransactionInput') createTransactionInput: CreateTransactionInput
  ) {
    return await this.transactionService.create(createTransactionInput, userId);
  }
}