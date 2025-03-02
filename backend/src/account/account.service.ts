import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service/prisma.service';
import { AccountModel, CreateAccountInput, UpdateAccountInput } from './account.model';

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

  async findAll(userId: string): Promise<AccountModel[]> {
    const accounts = await this.prisma.account.findMany({
      where: {
        user_id: userId
      },
      include: {
        user: true
      }
    });

    return accounts.map(account => ({
      ...account,
      balance: account.balance.toString(),
    }));
  }

  async create(createUserInput: CreateAccountInput, userId: string): Promise<AccountModel> {
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
