import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/services/prisma.service/prisma.service";
import { BudgetModel, CreateBudgetInput, UpdateBudgetInput } from "./budget.model";

@Injectable()
export class BudgetService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create(input: CreateBudgetInput, userId: string): Promise<BudgetModel> {
    const newBudget = await this.prisma.budget.create({
      data: {
        ...input,
        user_id: userId
      },
      include: {
        user: true
      }
    })

    return {
      ...newBudget,
      limit: newBudget.limit.toString(),
    }
  }

  async findAll(input: {
    userId: string;
    orderBy: 'category' | 'limit' | 'created_at' | 'updated_at';
    orderDirection: 'asc' | 'desc';
    limit: number;
    offset: number
  }): Promise<BudgetModel[]> {
    const { userId, orderBy, orderDirection, limit, offset } = input;
    const budgets = await this.prisma.budget.findMany({
      where: {
        user_id: userId
      },
      include: {
        user: true
      },
      orderBy: {
        [orderBy]: orderDirection
      },
      take: limit,
      skip: offset
    })
  
    return budgets.map(budget => ({
      ...budget,
      limit: budget.limit.toString(),
    }))
  }

  async findOne(id: string, userId: string): Promise<BudgetModel> {
    const budget = await this.prisma.budget.findUnique({
      where: {
        id,
        user_id: userId
      },
      include: {
        user: true
      }
    })

    return {
      ...budget,
      limit: budget.limit.toString(),
    }
  }

  async update(id: string, updateBudgetInput: UpdateBudgetInput, userId: string): Promise<BudgetModel> {
    const budget = await this.prisma.budget.update({
      where: {
        id,
        user_id: userId
      },
      data: {
        ...updateBudgetInput,
      },
      include: {
        user: true
      }
    })

    return {
      ...budget,
      limit: budget.limit.toString(),
    }
  }

  async remove(id: string, userId: string): Promise<BudgetModel> {
    const budget = await this.prisma.budget.delete({
      where: {
        id,
        user_id: userId
      },
      include: {
        user: true
      }
    })

    return {
      ...budget,
      limit: budget.limit.toString(),
    }
  }
}