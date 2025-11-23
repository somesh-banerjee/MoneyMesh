import { Module } from "@nestjs/common";
import { InvestmentService } from "./investment.service";
import { InvestmentResolver } from "./investment.resolver";
import { PrismaService } from "src/shared/services/prisma.service/prisma.service";
import { AccountModule } from "src/account/account.module";
import { TransactionModule } from "src/transaction/transaction.module";

@Module({
  imports: [AccountModule, TransactionModule],
  providers: [InvestmentService, InvestmentResolver, PrismaService],
})
export class InvestmentModule { }