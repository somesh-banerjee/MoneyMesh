import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/services/prisma.service/prisma.service";
import { CreateInvestmentInput, InvestmentModel, UpdateInvestmentInput } from "./investment.model";

@Injectable()
export class InvestmentService {
  constructor(private readonly prisma: PrismaService) { }

  async create(input: CreateInvestmentInput, userId: string): Promise<InvestmentModel> {
    const newInvestment = await this.prisma.investment.create({
      data: {
        ...input,
        user_id: userId
      },
      include: {
        user: true
      }
    })

    return {
      ...newInvestment,
      amount_invested: newInvestment.amount_invested.toString(),
      current_value: newInvestment.current_value.toString(),
    }
  }

  async findAll(input: {
    userId: string;
    orderBy: 'name' | 'type' | 'amount_invested' | 'current_value' | 'created_at' | 'updated_at';
    orderDirection: 'asc' | 'desc';
    limit: number;
    offset: number
  }): Promise<InvestmentModel[]> {
    const { userId, orderBy, orderDirection, limit, offset } = input;
    const investments = await this.prisma.investment.findMany({
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

    return investments.map(investment => ({
      ...investment,
      amount_invested: investment.amount_invested.toString(),
      current_value: investment.current_value.toString(),
    }))
  }

  async findOne(id: string, userId: string): Promise<InvestmentModel> {
    const investment = await this.prisma.investment.findFirst({
      where: {
        id,
        user_id: userId
      },
      include: {
        user: true
      }
    })

    return {
      ...investment,
      amount_invested: investment.amount_invested.toString(),
      current_value: investment.current_value.toString(),
    }
  }

  async update(id: string, updateInvestmentInput: UpdateInvestmentInput, userId: string): Promise<InvestmentModel> {
    const investment = await this.prisma.investment.update({
      where: {
        id,
        user_id: userId
      },
      data: {
        ...updateInvestmentInput,
        updated_at: new Date()
      },
      include: {
        user: true
      }
    })

    return {
      ...investment,
      amount_invested: investment.amount_invested.toString(),
      current_value: investment.current_value.toString(),
    }
  }

  async delete(id: string, userId: string): Promise<InvestmentModel> {
    const investment = await this.prisma.investment.delete({
      where: {
        id,
        user_id: userId
      },
      include: {
        user: true
      }
    })

    return {
      ...investment,
      amount_invested: investment.amount_invested.toString(),
      current_value: investment.current_value.toString(),
    }
  }
}