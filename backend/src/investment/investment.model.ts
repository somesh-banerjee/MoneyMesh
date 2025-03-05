import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { UserModel } from "src/user/user.model";
import { InvestmentType as InvestmentTypeEnum } from '@prisma/client';

registerEnumType(InvestmentTypeEnum, {
  name: 'InvestmentType'
})

@ObjectType()
export class InvestmentModel {
  @Field()
  id: string;

  @Field()
  asset_name: string;

  @Field()
  asset_type: InvestmentTypeEnum;

  @Field()
  amount_invested: string;

  @Field()
  current_value: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  @Field(type => UserModel)
  user: UserModel;
}

@InputType()
export class CreateInvestmentInput {
  @Field()
  asset_name: string;

  @Field(type => InvestmentTypeEnum)
  asset_type: InvestmentTypeEnum;

  @Field()
  amount_invested: string;

  @Field()
  current_value: string;
}

@InputType()
export class UpdateInvestmentInput {
  @Field({ nullable: true })
  asset_name: string;

  @Field({ nullable: true })
  amount_invested: string;

  @Field({ nullable: true })
  current_value: string;
}