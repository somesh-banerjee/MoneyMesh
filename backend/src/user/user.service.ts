import { Injectable } from '@nestjs/common';
import { UserModel } from './user.model';
import { PrismaService } from 'src/shared/services/prisma.service/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async findOneById(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async create(createUserInput: Prisma.UserCreateInput) {
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
    const user = { ...createUserInput, password: hashedPassword };
    return await this.prisma.user.create({
      data: user
    });
  }
}
