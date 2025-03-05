import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/shared/guards/auth.guard";
import { BudgetModel, CreateBudgetInput, UpdateBudgetInput } from "./budget.model";
import { BudgetService } from "./budget.service";
import { JwtPayload } from "src/shared/decorators/jwt-payload.decorator";

@Resolver(() => BudgetModel)
@UseGuards(JwtAuthGuard)
export class BudgetResolver {
  constructor(
    private readonly budgetService: BudgetService
  ) { }

  @Query(() => BudgetModel, { name: 'budget' })
  getBudget(
    @JwtPayload('id') userId: string,
    @Args('id') id: string
  ): Promise<BudgetModel> {
    return this.budgetService.findOne(id, userId)
  }

  @Query(() => [BudgetModel], { name: 'budgets' })
  getBudgets(
    @JwtPayload('id') userId: string,
    @Args('orderBy', { defaultValue: 'created_at' }) orderBy: 'category' | 'limit' | 'created_at' | 'updated_at',
    @Args('orderDirection', { defaultValue: 'desc' }) orderDirection: 'asc' | 'desc',
    @Args('limit', { defaultValue: 10 }) limit: number,
    @Args('offset', { defaultValue: 0 }) offset: number
  ): Promise<BudgetModel[]> {
    return this.budgetService.findAll({
      userId,
      orderBy,
      orderDirection,
      limit,
      offset
    })
  }

  @Mutation(() => BudgetModel)
  createBudget(
    @JwtPayload('id') userId: string,
    @Args('createBudgetInput') input: CreateBudgetInput
  ): Promise<BudgetModel> {
    return this.budgetService.create(input, userId)
  }

  @Mutation(() => BudgetModel)
  updateBudget(
    @JwtPayload('id') userId: string,
    @Args('id') id: string,
    @Args('updateBudgetInput') input: UpdateBudgetInput
  ): Promise<BudgetModel> {
    return this.budgetService.update(id, input, userId)
  }

  @Mutation(() => BudgetModel)
  removeBudget(
    @JwtPayload('id') userId: string,
    @Args('id') id: string
  ): Promise<BudgetModel> {
    return this.budgetService.remove(id, userId)
  }
}