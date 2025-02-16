import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field()
  id: String;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  created_at: Date;
}

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}