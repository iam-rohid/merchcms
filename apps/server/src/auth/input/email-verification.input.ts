import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class EmailVerificationInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  token: string;
}
