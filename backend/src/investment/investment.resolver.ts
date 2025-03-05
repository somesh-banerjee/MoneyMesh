import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/shared/guards/auth.guard";
import { InvestmentModel, CreateInvestmentInput, UpdateInvestmentInput } from "./investment.model";
import { InvestmentService } from "./investment.service";
import { JwtPayload } from "src/shared/decorators/jwt-payload.decorator";

@Resolver(() => InvestmentModel)
@UseGuards(JwtAuthGuard)
export class InvestmentResolver {
  constructor(
    private readonly investmentService: InvestmentService
  ) { }

  @Query(() => InvestmentModel, { name: 'investment' })
  getInvestment(
    @JwtPayload('id') userId: string,
    @Args('id') id: string
  ): Promise<InvestmentModel> {
    return this.investmentService.findOne(id, userId)
  }

  @Query(() => [InvestmentModel], { name: 'investments' })
  getInvestments(
    @JwtPayload('id') userId: string,
    @Args('orderBy', { defaultValue: 'created_at' }) orderBy: 'name' | 'created_at' | 'updated_at',
    @Args('orderDirection', { defaultValue: 'desc' }) orderDirection: 'asc' | 'desc',
    @Args('limit', { defaultValue: 10 }) limit: number,
    @Args('offset', { defaultValue: 0 }) offset: number
  ): Promise<InvestmentModel[]> {
    return this.investmentService.findAll({
      userId,
      orderBy,
      orderDirection,
      limit,
      offset
    })
  }

  @Mutation(() => InvestmentModel)
  createInvestment(
    @JwtPayload('id') userId: string,
    @Args('createInvestmentInput') input: CreateInvestmentInput
  ): Promise<InvestmentModel> {
    return this.investmentService.create(input, userId)
  }

  @Mutation(() => InvestmentModel)
  updateInvestment(
    @JwtPayload('id') userId: string,
    @Args('id') id: string,
    @Args('updateInvestmentInput') input: UpdateInvestmentInput
  ): Promise<InvestmentModel> {
    return this.investmentService.update(id, input, userId)
  }

  @Mutation(() => InvestmentModel)
  removeInvestment(
    @JwtPayload('id') userId: string,
    @Args('id') id: string
  ): Promise<InvestmentModel> {
    return this.investmentService.delete(id, userId)
  }
}