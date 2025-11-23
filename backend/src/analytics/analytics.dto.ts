import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class HomePageAnalyticsDto {
  @Field()
  totalBankBalance: number;

  @Field()
  totalInvestment: number;

  @Field()
  earnings: number;

  @Field()
  expenses: number;

  @Field()
  investments: number;
}
