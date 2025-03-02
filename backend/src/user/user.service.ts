import { Injectable, Logger } from '@nestjs/common';
import { CreateUserInput } from './user.model';
import { PrismaService } from 'src/shared/services/prisma.service/prisma.service';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService
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
    const saltRounds = this.configService.get<number>('BCRYPT.SALT_ROUNDS');
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(createUserInput.password, salt);
    const user = { ...createUserInput, password: hashedPassword };
    return await this.prisma.user.create({
      data: user
    });
  }
}
