import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
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

    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { id: input.id },
          { email: input.email },
        ],
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(createUserInput: CreateUserInput) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserInput.email },
    });

    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    const saltRounds = this.configService.get<number>('BCRYPT.SALT_ROUNDS');
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(createUserInput.password, salt);
    const user = { ...createUserInput, password: hashedPassword };

    return await this.prisma.user.create({
      data: user,
    });
  }
}
