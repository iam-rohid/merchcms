import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class EmailPasswordSignInInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
