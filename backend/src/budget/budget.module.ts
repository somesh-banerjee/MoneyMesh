import { Module } from "@nestjs/common";
import { BudgetService } from "./budget.service";
import { BudgetResolver } from "./budget.resolver";
import { PrismaService } from "src/shared/services/prisma.service/prisma.service";

@Module({
  providers: [BudgetService, BudgetResolver, PrismaService],
})
export class BudgetModule {}