import { createUnionType, Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/models";

@ObjectType()
export class EmailVerificationSuccess {
  @Field(() => User)
  user: User;
  @Field(() => String)
  token: string;

  constructor(user: User, token: string) {
    this.token = token;
    this.user = user;
  }
}

@ObjectType()
export class EmailVerificationFailure {
  @Field(() => String, { nullable: true })
  emailError?: string;
  @Field(() => String, { nullable: true })
  tokenError?: string;
  @Field(() => String, { nullable: true })
  otherError?: string;

  constructor({
    emailError: email,
    tokenError: token,
    otherError: other,
  }: {
    emailError?: string;
    tokenError?: string;
    otherError?: string;
  }) {
    this.emailError = email;
    this.otherError = other;
    this.tokenError = token;
  }
}

export const EmailVerificationResultUnion = createUnionType({
  name: "EmailVerificationResult",
  types: () => [EmailVerificationSuccess, EmailVerificationFailure],
});

export type EmailVerificationResult =
  | EmailVerificationSuccess
  | EmailVerificationFailure;
