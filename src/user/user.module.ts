import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './user.model';
import { BankAccountModel } from './bankAccount.model';
import { InvestmentModel } from './investment.model';
import { BudgetModel } from './budget.model';
import { ExpenseModel } from './expense.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserModel,
      BankAccountModel,
      InvestmentModel,
      BudgetModel,
      ExpenseModel,
    ]),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
