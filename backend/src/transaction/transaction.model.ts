import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { AccountModel } from 'src/account/account.model';
import { UserModel } from 'src/user/user.model';

@ObjectType()
export class TransactionModel {
  @Field()
  id: String;

  @Field()
  amount: number;

  @Field()
  currency: string;

  @Field()
  category: string;

  @Field(type => TransactionTypeEnum)
  type: TransactionTypeEnum;

  @Field()
  created_at: Date;

  @Field(type => UserModel )
  user: UserModel;

  @Field(type => AccountModel)
  account: AccountModel;
}

export enum TransactionTypeEnum {
  INCOME,
  EXPENSE,
  TRANSFER
}

@InputType()
export class CreateTransactionInput {
  @Field()
  name: string;

  @Field(type => TransactionTypeEnum)
  type: TransactionTypeEnum;

  @Field()
  currency: string;
}