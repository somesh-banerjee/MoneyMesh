import { Module } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { TransactionResolver } from "./transaction.resolver";
import { PrismaService } from "src/shared/services/prisma.service/prisma.service";

@Module({
  providers: [TransactionService, TransactionResolver, PrismaService]
})
export class TransactionModule { }