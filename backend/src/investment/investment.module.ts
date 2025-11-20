import { Module } from "@nestjs/common";
import { InvestmentService } from "./investment.service";
import { InvestmentResolver } from "./investment.resolver";
import { PrismaService } from "src/shared/services/prisma.service/prisma.service";
import { AccountModule } from "src/account/account.module";

@Module({
  imports: [AccountModule],
  providers: [InvestmentService, InvestmentResolver, PrismaService],
})
export class InvestmentModule { }