import { ObjectType, Field, InputType, registerEnumType } from '@nestjs/graphql';
import { UserModel } from 'src/user/user.model';
import { AccountType as AccountTypeEnum } from 'src/shared/prisma';
import { IsEnum, IsString, Length, MaxLength, MinLength } from 'class-validator';

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
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @Field(type => AccountTypeEnum)
  @IsEnum(AccountTypeEnum)
  type: AccountTypeEnum;

  @Field()
  @IsString()
  @Length(3, 3)
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