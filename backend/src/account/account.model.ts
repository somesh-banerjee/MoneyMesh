import { ObjectType, Field, InputType, registerEnumType } from '@nestjs/graphql';
import { UserModel } from 'src/user/user.model';
import { AccountType as AccountTypeEnum } from '@prisma/client';

registerEnumType(AccountTypeEnum, {
  name: 'AccountType'
})

@ObjectType()
export class AccountModel {
  @Field()
  id: String;

  @Field()
  name: string;

  @Field(type => AccountTypeEnum)
  type: AccountTypeEnum;

  @Field()
  balance: string;

  @Field()
  currency: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  @Field(type => UserModel)
  user: UserModel;
}


@InputType()
export class CreateAccountInput {
  @Field()
  name: string;

  @Field(type => AccountTypeEnum)
  type: AccountTypeEnum;

  @Field()
  currency: string;
}

@InputType()
export class UpdateAccountInput {
  @Field({ nullable: true })
  name: string;

  @Field(type => AccountTypeEnum, { nullable: true })
  type: AccountTypeEnum;

  @Field({ nullable: true })
  currency: string;
}