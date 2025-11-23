import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/services/prisma.service/prisma.service";
import { HomePageAnalyticsDto } from "./analytics.dto";
import { Decimal } from "@prisma/client/runtime/library";
import { AccountType, TransactionDirection, TransactionType } from "@prisma/client";
import { Logger } from "@nestjs/common";

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name)
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async homePageAnalytics(userId: string, period: 'monthly' | 'yearly', range: 'current' | 'previous'): Promise<HomePageAnalyticsDto> {
    const accounts = await this.prisma.account.findMany({
      where: {
        user_id: userId
      }
    })
    let totalBankBalance = new Decimal(0)
    let totalInvestments = new Decimal(0)

    accounts.forEach(account => {
      if (account.type === 'BANK') {
        totalBankBalance = totalBankBalance.plus(account.balance)
      }
      if (account.type === 'INVESTMENT') {
        totalInvestments = totalInvestments.plus(account.balance)
      }
    })

    let earnings = new Decimal(0)
    let expenses = new Decimal(0)
    let investments = new Decimal(0)

    const transactions = await this.prisma.transaction.findMany({
      where: {
        user_id: userId,
        account: {
          type: AccountType.BANK
        },
        created_at: this.getRange(period, range)
      }
    })

    transactions.forEach(transaction => {
      if (transaction.type === TransactionType.INCOME) {
        earnings = earnings.plus(transaction.amount)
      }
      if (transaction.type === TransactionType.EXPENSE) {
        expenses = expenses.plus(transaction.amount)
      }
      if (transaction.type === TransactionType.TRANSFER && transaction.direction === TransactionDirection.DEBIT && transaction.category.toLowerCase().includes('investment')) {
        investments = investments.plus(transaction.amount)
      }
    })

    return {
      totalBankBalance: totalBankBalance.toNumber(),
      totalInvestment: totalInvestments.toNumber(),
      earnings: earnings.toNumber(),
      expenses: expenses.toNumber(),
      investments: investments.toNumber()
    }
  }

  private getRange(period: 'monthly' | 'yearly', range: 'current' | 'previous') {
    if (period === 'monthly') {
      if (range === 'current') {
        return {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
        }
      } else {
        return {
          gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
          lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }
    } else {
      if (range === 'current') {
        return {
          gte: new Date(new Date().getFullYear(), 0, 1),
          lt: new Date(new Date().getFullYear() + 1, 0, 1)
        }
      } else {
        return {
          gte: new Date(new Date().getFullYear() - 1, 0, 1),
          lt: new Date(new Date().getFullYear(), 0, 1)
        }
      }
    }
  }
}
