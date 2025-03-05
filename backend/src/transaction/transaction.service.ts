import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/services/prisma.service/prisma.service";
import { CreateTransactionInput, TransactionModel } from "./transaction.model";
import { TransactionType as TransactionTypeEnum, TransactionDirection as TransactionDirectionEnum } from '@prisma/client';
import { Decimal } from "@prisma/client/runtime/library";

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createTransactionInput: CreateTransactionInput, userId: string): Promise<TransactionModel> {
    let transaction

    const singleTransaction = await this.prisma.$transaction(async (tx) => {
      transaction = await this.prisma.transaction.create({
        data: {
          ...createTransactionInput,
          user_id: userId
        },
        include: {
          user: true,
          account: true
        }
      })

      const amount = new Decimal(transaction.amount)
      const balanceChange = createTransactionInput.direction === TransactionDirectionEnum.CREDIT ? amount : amount.negated()

      await this.prisma.account.update({
        where: {
          id: transaction.account_id,
          user_id: userId
        },
        data: {
          balance: {
            increment: balanceChange
          },
          updated_at: new Date()
        }
      })
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

  async findAll(input: {
    userId: string,
    accountId: string,
    orderBy: 'party' | 'category' | 'type' | 'direction' | 'amount' | 'created_at' | 'updated_at',
    orderDirection: 'asc' | 'desc',
    limit: number, offset: number
  }): Promise<TransactionModel[]> {
    const { userId, accountId, orderBy, orderDirection, limit, offset } = input
    const transactions = await this.prisma.transaction.findMany({
      where: {
        user_id: userId,
        account_id: accountId
      },
      include: {
        user: true,
        account: true
      },
      orderBy: {
        [orderBy]: orderDirection
      },
      skip: offset,
      take: limit
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