import { ObjectType, Field, InputType, registerEnumType } from '@nestjs/graphql';
import { TransactionType as TransactionTypeEnum, TransactionDirection as TransactionDirectionEnum } from '@prisma/client';
import { AccountModel } from 'src/account/account.model';
import { UserModel } from 'src/user/user.model';

registerEnumType(TransactionTypeEnum, {
  name: 'TransactionType'
})

registerEnumType(TransactionDirectionEnum, {
  name: 'TransactionDirection'
})

@ObjectType()
export class TransactionModel {
  @Field()
  id: String;

  @Field()
  amount: string;
  
  @Field()
  category: string;

  @Field()
  note: string;

  @Field(type => TransactionTypeEnum)
  type: TransactionTypeEnum;

  @Field(type => TransactionDirectionEnum)
  direction: TransactionDirectionEnum;

  @Field()
  counterparty: string;

  @Field()
  created_at: Date;

  @Field(type => UserModel)
  user: UserModel;

  @Field(type => AccountModel)
  account: AccountModel;
}

@InputType()
export class CreateTransactionInput {
  @Field()
  amount: string;

  @Field()
  category: string;

  @Field()
  note: string;

  @Field(type => TransactionTypeEnum)
  type: TransactionTypeEnum;

  @Field(type => TransactionDirectionEnum)
  direction: TransactionDirectionEnum;

  @Field()
  counterparty: string;

  @Field()
  created_at: Date;

  @Field()
  account_id: string;
}