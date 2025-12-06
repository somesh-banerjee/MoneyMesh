import { Module } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { TransactionResolver } from "./transaction.resolver";
import { PrismaService } from "src/shared/services/prisma.service/prisma.service";
import { TransactionController } from "./transaction.controller";

@Module({
  providers: [TransactionService, TransactionResolver, PrismaService],
  controllers: [TransactionController],
  exports: [TransactionService]
})
export class TransactionModule { }