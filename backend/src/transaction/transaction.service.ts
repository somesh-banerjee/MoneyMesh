import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/services/prisma.service/prisma.service";
import { CreateTransactionInput, TransactionModel } from "./transaction.model";

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createTransactionInput: CreateTransactionInput, userId: string): Promise<TransactionModel> {
    const transaction = await this.prisma.transaction.create({
      data: {
        ...createTransactionInput,
        user_id: userId
      },
      include: {
        user: true,
        account: true
      }
    })

    return {
      ...transaction,
      amount: transaction.amount.toString(),
      account: {
        ...transaction.account,
        balance: transaction.account.balance.toString(),
        user: transaction.user
      }
    }

  }

  async findAll(userId: string, accountId: string): Promise<TransactionModel[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        user_id: userId,
        account_id: accountId
      },
      include: {
        user: true,
        account: true
      }
    })

    return transactions.map(transaction => ({
      ...transaction,
      amount: transaction.amount.toString(),
      account: {
        ...transaction.account,
        balance: transaction.account.balance.toString(),
        user: transaction.user
      }
    }))
  }

  async findOne(id: string, userId: string): Promise<TransactionModel> {
    const transaction = await this.prisma.transaction.findFirst({
      where: {
        id,
        user_id: userId
      },
      include: {
        user: true,
        account: true
      }
    })

    return {
      ...transaction,
      amount: transaction.amount.toString(),
      account: {
        ...transaction.account,
        balance: transaction.account.balance.toString(),
        user: transaction.user
      }
    }
  }

}