import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

@ObjectType()
export class UserModel {
  @Field()
  id: String;

  @Field()
  name: string;

  @Field()
  email: string;

  //   @Field()
  password: string;

  @Field()
  created_at: Date;
}

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
    message: 'password must contain at least one letter and one number',
  })
  password: string;
}
