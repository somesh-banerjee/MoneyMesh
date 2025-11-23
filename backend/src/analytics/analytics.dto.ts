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

@ObjectType()
export class TimelineAnalyticsDto {
  @Field()
  bucket: string;

  @Field()
  earning: number;

  @Field()
  expense: number;

  @Field()
  investment: number;

  @Field()
  other: number;

  @Field()
  credit: number;

  @Field()
  debit: number;
}

