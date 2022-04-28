import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ChangePasswordInput {
  @Field(() => String)
  oldPassword: string;
  @Field(() => String)
  newPassword: string;
}
