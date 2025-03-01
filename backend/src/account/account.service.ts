import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service/prisma.service';
import { CreateAccountInput, UpdateAccountInput } from './account.model';

@Injectable()
export class AccountService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async findOne(id: string, userId: string) {

    return await this.prisma.account.findFirst({
      where: {
        id: id,
        user_id: userId
      },
    });
  }

  async findAll(userId: string) {
    return await this.prisma.account.findMany({
      where: {
        user_id: userId
      }
    });
  }

  async create(createUserInput: CreateAccountInput, userId: string) {
    return await this.prisma.account.create({
      data: {
        ...createUserInput,
        user_id: userId
      }
    });
  }

  async update(id: string, updateUserInput: UpdateAccountInput, userId: string) {
    return await this.prisma.account.update({
      where: {
        id,
        user_id: userId
      },
      data: {
        ...updateUserInput,
      }
    });
  }

  async delete(id: string, userId: string) {
    return await this.prisma.account.delete({
      where: {
        id,
        user_id: userId
      }
    });
  }
}
