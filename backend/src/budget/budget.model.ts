import { ObjectType, Field, registerEnumType, InputType } from "@nestjs/graphql";
import { UserModel } from "src/user/user.model";
import { BudgetPeriod } from "@prisma/client"

registerEnumType(BudgetPeriod, {
  name: 'BudgetPeriod'
})

@ObjectType()
export class BudgetModel {
  @Field()
  id: string;

  @Field()
  category: string;

  @Field()
  limit: string;

  @Field(type => BudgetPeriod)
  period: BudgetPeriod;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  @Field(type => UserModel)
  user: UserModel;
}

@InputType()
export class CreateBudgetInput {
  @Field()
  category: string;

  @Field()
  limit: string;

  @Field(type => BudgetPeriod)
  period: BudgetPeriod;
}

@InputType()
export class UpdateBudgetInput {
  @Field({ nullable: true })
  category: string;

  @Field({ nullable: true })
  limit: string;

  @Field({ nullable: true })
  period: BudgetPeriod;
}