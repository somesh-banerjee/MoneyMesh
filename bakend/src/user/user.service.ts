import { Injectable } from '@nestjs/common';
import { UserModel } from './user.model';
import { PrismaService } from 'src/shared/services/prisma.service/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async findOneById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
