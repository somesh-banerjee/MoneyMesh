import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from 'src/shared/services/prisma.service/prisma.service';

@Module({
  imports: [
  ],
  providers: [UserService, UserResolver, PrismaService],
  exports: [UserService],
})
export class UserModule { }
