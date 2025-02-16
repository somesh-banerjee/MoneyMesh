import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './user.model';
import { PrismaService } from 'src/shared/services/prisma.service/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async findOne(input: { id?: string, email?: string }) {
    if (!input.id && !input.email) {
      throw new Error('You must provide either an ID or an email.');
    }
    return await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            id: input.id
          }, {
            email: input.email
          }
        ]
      }
    });
  }

  async create(createUserInput: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
    const user = { ...createUserInput, password: hashedPassword };
    return await this.prisma.user.create({
      data: user
    });
  }
}
