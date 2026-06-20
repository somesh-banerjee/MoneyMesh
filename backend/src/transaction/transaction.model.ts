import { ObjectType, Field, InputType, registerEnumType } from '@nestjs/graphql';
import { TransactionType as TransactionTypeEnum, TransactionDirection as TransactionDirectionEnum } from '@prisma/client';
import { AccountModel } from 'src/account/account.model';
import { UserModel } from 'src/user/user.model';
import { IsDate, IsEnum, IsNumberString, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

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
  balance: string;

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
  @IsNumberString()
  amount: string;

  @Field()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  category: string;

  @Field()
  @IsString()
  @MaxLength(500)
  note: string;

  @Field(type => TransactionTypeEnum)
  @IsEnum(TransactionTypeEnum)
  type: TransactionTypeEnum;

  @Field(type => TransactionDirectionEnum)
  @IsEnum(TransactionDirectionEnum)
  direction: TransactionDirectionEnum;

  @Field()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  counterparty: string;

  @Field()
  @IsDate()
  created_at: Date;

  @Field()
  @IsUUID()
  account_id: string;
}