import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class EmailPasswordSignUpInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
