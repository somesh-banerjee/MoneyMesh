import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/services/prisma.service/prisma.service";
import { CreateInvestmentInput, InvestmentModel, UpdateInvestmentInput } from "./investment.model";
import { AccountService } from "src/account/account.service";
import { AccountType, TransactionDirection, TransactionType } from "@prisma/client";
import { TransactionService } from "src/transaction/transaction.service";

@Injectable()
export class InvestmentService {
  constructor(private readonly prisma: PrismaService, private readonly accountService: AccountService, private readonly transactionService: TransactionService) { }

  async create(input: CreateInvestmentInput, userId: string): Promise<InvestmentModel> {
    const account = await this.accountService.create({
      name: `${input.asset_name} Account`,
      type: AccountType.INVESTMENT,
      currency: input.currency,
    }, userId);

    if (Number(input.amount_invested) > 0) {
      await this.transactionService.create({
        amount: input.amount_invested,
        type: TransactionType.OTHER,
        direction: TransactionDirection.CREDIT,
        account_id: account.id.trim(),
        category: 'Investment',
        note: 'New Investment',
        counterparty: 'New Investment',
        created_at: new Date(),
      }, userId)
    }

    const newInvestment = await this.prisma.investment.create({
      data: {
        asset_name: input.asset_name,
        asset_type: input.asset_type,
        amount_invested: input.amount_invested,
        current_value: input.current_value,
        expected_cagr: input.expected_cagr,
        user_id: userId,
        account_id: account.id.trim()
      },
      include: {
        user: true,
        account: {
          include: {
            user: true
          }
        }
      }
    })

    return {
      ...newInvestment,
      amount_invested: newInvestment.amount_invested.toString(),
      current_value: newInvestment.current_value.toString(),
      expected_cagr: newInvestment.expected_cagr.toString(),
      account: {
        ...newInvestment.account,
        balance: newInvestment.account.balance.toString(),
      }
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
        user: true,
        account: {
          include: {
            user: true
          }
        }
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
      expected_cagr: investment.expected_cagr.toString(),
      account: {
        ...investment.account,
        balance: investment.account.balance.toString(),
      }
    }))
  }

  async findOne(id: string, userId: string): Promise<InvestmentModel> {
    const investment = await this.prisma.investment.findFirst({
      where: {
        id,
        user_id: userId
      },
      include: {
        user: true,
        account: {
          include: {
            user: true
          }
        }
      }
    })

    return {
      ...investment,
      amount_invested: investment.amount_invested.toString(),
      current_value: investment.current_value.toString(),
      expected_cagr: investment.expected_cagr.toString(),
      account: {
        ...investment.account,
        balance: investment.account.balance.toString(),
      }
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
        user: true,
        account: {
          include: {
            user: true
          }
        }
      }
    })

    return {
      ...investment,
      amount_invested: investment.amount_invested.toString(),
      current_value: investment.current_value.toString(),
      expected_cagr: investment.expected_cagr.toString(),
      account: {
        ...investment.account,
        balance: investment.account.balance.toString(),
      }
    }
  }

  async delete(id: string, userId: string): Promise<InvestmentModel> {
    const investment = await this.prisma.investment.delete({
      where: {
        id,
        user_id: userId
      },
      include: {
        user: true,
        account: {
          include: {
            user: true
          }
        }
      }
    })

    return {
      ...investment,
      amount_invested: investment.amount_invested.toString(),
      current_value: investment.current_value.toString(),
      expected_cagr: investment.expected_cagr.toString(),
      account: {
        ...investment.account,
        balance: investment.account.balance.toString(),
      }
    }
  }
}