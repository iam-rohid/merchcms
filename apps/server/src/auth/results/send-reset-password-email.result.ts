import { createUnionType, Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SendResetPasswordEmailSuccess {
  @Field(() => String)
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

@ObjectType()
export class SendResetPasswordEmailFailure {
  @Field(() => String, { nullable: true })
  otherError?: string;
  @Field(() => String, { nullable: true })
  emailError?: string;

  constructor({
    otherError,
    emailError,
  }: {
    otherError?: string;
    emailError?: string;
  }) {
    this.otherError = otherError;
    this.emailError = emailError;
  }
}

export const SendResetPasswordEmailResultUnion = createUnionType({
  name: "SendResetPasswordEmailResult",
  types: () => [SendResetPasswordEmailSuccess, SendResetPasswordEmailFailure],
});

export type SendResetPasswordEmailResult =
  | SendResetPasswordEmailSuccess
  | SendResetPasswordEmailFailure;
