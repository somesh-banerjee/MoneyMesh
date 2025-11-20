import { Module } from "@nestjs/common";
import { AccountService } from "./account.service";
import { AccountResolver } from "./account.resolver";
import { PrismaService } from "src/shared/services/prisma.service/prisma.service";

@Module({
  providers: [AccountService, AccountResolver, PrismaService],
  exports: [AccountService],
})
export class AccountModule { }