import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
  @Field(() => String)
  id: string;
  @Field(() => Date)
  createdAt: Date;
  @Field(() => Date)
  updatedAt: Date;
  @Field(() => String)
  username: string;
  @Field(() => String)
  email: string;
  @Field(() => Boolean)
  emailVerified: boolean;
  password: string;
  emailVerificationToken: string;
}
