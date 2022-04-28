import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SendResetPasswordEmailInput {
  @Field(() => String)
  email: string;
}
