import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service/prisma.service';
import { AccountModel, CreateAccountInput, UpdateAccountInput } from './account.model';
import { AccountType } from '@prisma/client';

@Injectable()
export class AccountService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async findOne(id: string, userId: string): Promise<AccountModel> {

    const account = await this.prisma.account.findFirst({
      where: {
        id: id,
        user_id: userId
      },
      include: {
        user: true
      }
    });

    return {
      ...account,
      balance: account.balance.toString(),
    };
  }

  async findAll(input: {
    userId: string;
    orderBy: 'name' | 'type' | 'balance' | 'currency' | 'created_at' | 'updated_at';
    orderDirection: 'asc' | 'desc';
    limit: number;
    offset: number
  }): Promise<AccountModel[]> {
    const { userId, orderBy, orderDirection, limit, offset } = input;
    const accounts = await this.prisma.account.findMany({
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
    });

    return accounts.map(account => ({
      ...account,
      balance: account.balance.toString(),
    }));
  }

  async create(createUserInput: CreateAccountInput, userId: string): Promise<AccountModel> {
    if (createUserInput.type === AccountType.INVESTMENT) {
      throw new ForbiddenException('Investment accounts must be created through the investment mutation');
    }

    const account = await this.prisma.account.create({
      data: {
        ...createUserInput,
        user_id: userId
      },
      include: {
        user: true
      }
    });

    return {
      ...account,
      balance: account.balance.toString(),
    };
  }

  async update(id: string, updateUserInput: UpdateAccountInput, userId: string): Promise<AccountModel> {
    const account = await this.prisma.account.update({
      where: {
        id,
        user_id: userId
      },
      data: {
        ...updateUserInput,
        updated_at: new Date()
      },
      include: {
        user: true
      }
    });

    return {
      ...account,
      balance: account.balance.toString(),
    };
  }

  async delete(id: string, userId: string): Promise<AccountModel> {
    const account = await this.prisma.account.delete({
      where: {
        id,
        user_id: userId
      },
      include: {
        user: true
      }
    });

    return {
      ...account,
      balance: account.balance.toString(),
    };
  }
}
