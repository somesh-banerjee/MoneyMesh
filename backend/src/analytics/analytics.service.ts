import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/services/prisma.service/prisma.service";
import { HomePageAnalyticsDto } from "./analytics.dto";
import { Decimal } from "@prisma/client/runtime/library";
import { AccountType, Transaction, TransactionDirection, TransactionType } from "@prisma/client";
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

  async timelineAnalytics(userId: string, accountId: string, from: Date, to: Date) {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        user_id: userId,
        account_id: accountId,
        created_at: {
          gte: from,
          lte: to
        }
      }
    })

    const timeline = this.buildTimeseries(transactions, from, to)

    return timeline
  }

  private getBucketSize(from: Date, to: Date): "day" | "week" | "month" | "year" {
    const diffDays =
      (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDays <= 90) return "day";      // up to 3 months
    if (diffDays <= 365) return "week";    // up to 1 year
    if (diffDays <= 1095) return "month";  // up to 3 years

    return "year"; // very large range
  }

  private getBucketKey(date: Date, bucket: "day" | "week" | "month" | "year") {
    const d = new Date(date);

    if (bucket === "day") {
      d.setHours(0, 0, 0, 0);
      return d;
    }

    if (bucket === "week") {
      const diff = d.getDay() === 0 ? -6 : 1 - d.getDay();
      d.setDate(d.getDate() + diff);
      d.setHours(0, 0, 0, 0);
      return d; // Monday
    }

    if (bucket === "month") {
      return new Date(d.getFullYear(), d.getMonth(), 1);
    }

    if (bucket === "year") {
      return new Date(d.getFullYear(), 0, 1);
    }

    return d;
  }


  private groupByBucket(
    transactions: Transaction[],
    bucket: "day" | "week" | "month" | "year"
  ) {
    const map: Record<string, Transaction[]> = {};

    transactions.forEach((t) => {
      const key = this.getBucketKey(new Date(t.created_at), bucket).toISOString();
      if (!map[key]) map[key] = [];
      map[key].push(t);
    });

    return map;
  }


  private aggregateBuckets(grouped: Record<string, Transaction[]>) {
    return Object.entries(grouped).map(([bucket, txns]) => {
      let earning = new Decimal(0);
      let expense = new Decimal(0);
      let investment = new Decimal(0);
      let credit = new Decimal(0);
      let debit = new Decimal(0);
      let other = new Decimal(0);

      txns.forEach((t) => {
        if (t.direction === TransactionDirection.CREDIT) {
          credit = credit.plus(t.amount);
        } else {
          debit = debit.plus(t.amount);
        }

        if (t.type === TransactionType.INCOME) {
          earning = earning.plus(t.amount);
        } else if (t.type === TransactionType.EXPENSE) {
          expense = expense.plus(t.amount.abs());
        } else if (t.type === TransactionType.TRANSFER && t.direction === TransactionDirection.DEBIT && t.category.toLowerCase().includes('investment')) {
          investment = investment.plus(t.amount.abs());
        } else {
          other = other.plus(t.amount.abs());
        }
      });

      return { bucket, earning, expense, investment, other, credit, debit };
    });
  }



  private buildTimeseries(
    transactions: Transaction[],
    from: Date,
    to: Date
  ) {
    const bucket = this.getBucketSize(from, to);
    const grouped = this.groupByBucket(transactions, bucket);
    const aggregated = this.aggregateBuckets(grouped);

    return aggregated.sort(
      (a, b) => new Date(a.bucket).getTime() - new Date(b.bucket).getTime()
    );
  }

}
