import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/shared/services/prisma.service/prisma.service";
import { CreateTransactionInput, TransactionModel } from "./transaction.model";
import { TransactionDirection as TransactionDirectionEnum, AccountType, Decimal } from 'src/shared/prisma';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createTransactionInput: CreateTransactionInput, userId: string): Promise<TransactionModel> {
    const lastTx = await this.prisma.transaction.findFirst({
      where: { account_id: createTransactionInput.account_id },
      orderBy: { created_at: 'desc' },
      take: 1
    });

    if (lastTx && lastTx.created_at > createTransactionInput.created_at) {
      throw new ForbiddenException('Transactions must be created in chronological order');
    }

    const transaction = await this.prisma.$transaction(async (tx) => {
      const lastBalance = new Decimal(lastTx?.balance ?? 0);
      const amount = new Decimal(createTransactionInput.amount);
      const balanceChange = createTransactionInput.direction === TransactionDirectionEnum.CREDIT
        ? amount
        : amount.negated();

      const createdTransaction = await tx.transaction.create({
        data: {
          ...createTransactionInput,
          user_id: userId,
          balance: lastBalance.add(balanceChange).toString(),
        },
        include: {
          user: true,
          account: true,
        },
      });

      await tx.account.update({
        where: {
          id: createdTransaction.account_id,
          user_id: userId,
        },
        data: {
          balance: {
            increment: balanceChange,
          },
          updated_at: new Date(),
        },
      });

      if (createdTransaction.account.type === AccountType.INVESTMENT) {
        await tx.investment.updateMany({
          where: {
            account_id: createTransactionInput.account_id,
            user_id: userId,
          },
          data: {
            amount_invested: {
              increment: balanceChange,
            },
            updated_at: new Date(),
          },
        });
      }

      return createdTransaction;
    });

    return {
      ...transaction,
      amount: transaction.amount.toString(),
      balance: transaction.balance.toString(),
      account: {
        ...transaction.account,
        balance: transaction.account.balance.toString(),
        user: transaction.user,
      },
    };
  }

  async findAll(input: {
    userId: string,
    accountId: string,
    orderBy: 'counterparty' | 'category' | 'type' | 'direction' | 'amount' | 'created_at' | 'updated_at',
    orderDirection: 'asc' | 'desc',
    limit: number, offset: number
  }): Promise<TransactionModel[]> {
    const { userId, accountId, orderBy, orderDirection, limit, offset } = input;
    const transactions = await this.prisma.transaction.findMany({
      where: {
        user_id: userId,
        account_id: accountId,
      },
      include: {
        user: true,
        account: true,
      },
      orderBy: {
        [orderBy]: orderDirection,
      },
      skip: offset,
      take: limit,
    });

    return transactions.map(transaction => ({
      ...transaction,
      amount: transaction.amount.toString(),
      balance: transaction.balance.toString(),
      account: {
        ...transaction.account,
        balance: transaction.account.balance.toString(),
        user: transaction.user,
      },
    }));
  }

  async findOne(id: string, userId: string): Promise<TransactionModel> {
    const transaction = await this.prisma.transaction.findFirst({
      where: {
        id,
        user_id: userId,
      },
      include: {
        user: true,
        account: true,
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return {
      ...transaction,
      amount: transaction.amount.toString(),
      balance: transaction.balance.toString(),
      account: {
        ...transaction.account,
        balance: transaction.account.balance.toString(),
        user: transaction.user,
      },
    };
  }

  async downloadTransactions(userId: string, accountId: string): Promise<string> {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        user_id: userId,
        account_id: accountId,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    const headers = [
      'Date',
      'Amount',
      'Type',
      'Category',
      'Direction',
      'Counterparty',
      'Note',
    ];

    const rows = transactions.map(transaction => {
      return [
        `"${transaction.created_at.toDateString()}"`,
        transaction.amount,
        `"${transaction.type}"`,
        `"${transaction.category || ''}"`,
        `"${transaction.direction}"`,
        `"${transaction.counterparty || ''}"`,
        `"${transaction.note || ''}"`,
      ].join(',');
    });

    return [headers.join(','), ...rows].join('\n');
  }
}
