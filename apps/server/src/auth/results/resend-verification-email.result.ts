import { createUnionType, Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ResendVerificationEmailSuccess {
  @Field(() => String)
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

@ObjectType()
export class ResendVerificationEmailFailure {
  @Field(() => String, { nullable: true })
  emailError?: string;
  @Field(() => String, { nullable: true })
  otherError?: string;
  constructor({
    emailError,
    otherError,
  }: {
    emailError?: string;
    otherError?: string;
  }) {
    this.emailError = emailError;
    this.otherError = otherError;
  }
}

export const ResendVerificationEmailResultUnion = createUnionType({
  name: "ResendVerificationEmailResult",
  types: () => [ResendVerificationEmailSuccess, ResendVerificationEmailFailure],
});

export type ResendVerificationEmailResult =
  | ResendVerificationEmailSuccess
  | ResendVerificationEmailFailure;
