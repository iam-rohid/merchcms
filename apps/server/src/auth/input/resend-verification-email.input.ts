import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ResendVerificationEmailInput {
  @Field(() => String)
  email: string;
}
