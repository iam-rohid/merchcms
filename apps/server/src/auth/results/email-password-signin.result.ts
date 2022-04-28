import { createUnionType, Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/models";

@ObjectType()
export class EmailPasswordSignInSuccess {
  @Field(() => User)
  user: User;
  @Field(() => String)
  token: string;

  constructor(user: User, token: string) {
    this.user = user;
    this.token = token;
  }
}

@ObjectType()
export class EmailPasswordSignInFailure {
  @Field(() => String, { nullable: true })
  emailError?: string;
  @Field(() => String, { nullable: true })
  passwordError?: string;
  @Field(() => String, { nullable: true })
  otherError?: string;

  constructor({
    emailError,
    passwordError,
    otherError,
  }: {
    emailError?: string;
    passwordError?: string;
    otherError?: string;
  }) {
    this.passwordError = passwordError;
    this.emailError = emailError;
    this.otherError = otherError;
  }
}

export const EmailPasswordSignInResultUnion = createUnionType({
  name: "EmailPasswordSignInResult",
  types: () => [EmailPasswordSignInSuccess, EmailPasswordSignInFailure],
});

export type EmailPasswordSignInResult =
  | EmailPasswordSignInSuccess
  | EmailPasswordSignInFailure;
