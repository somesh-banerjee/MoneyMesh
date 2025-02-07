import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BankAccountModel } from './bankAccount.model';
import { BudgetModel } from './budget.model';
import { ExpenseModel } from './expense.model';
import { InvestmentModel } from './investment.model';

@ObjectType()
@Entity()
export class UserModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100, nullable: false })
  name: string;

  @Field()
  @Column({ length: 100, nullable: false })
  email: string;

  @Field()
  @Column({ length: 100, nullable: false })
  password: string;

  @OneToMany(() => BankAccountModel, (bankAccount) => bankAccount.user)
  bankAccounts: BankAccountModel[];

  @OneToMany(() => ExpenseModel, (expense) => expense.user)
  expenses: ExpenseModel[];

  @OneToMany(() => BudgetModel, (budget) => budget.user)
  budgets: BudgetModel[];

  @OneToMany(() => InvestmentModel, (investment) => investment.user)
  investments: InvestmentModel[];
}
