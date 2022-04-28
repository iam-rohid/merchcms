import { createUnionType, Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class EmailPasswordSignUpSuccess {
  @Field(() => String)
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}

@ObjectType()
export class EmailPasswordSignUpFailure {
  @Field(() => String, { nullable: true })
  usernameError?: string;
  @Field(() => String, { nullable: true })
  emailError?: string;
  @Field(() => String, { nullable: true })
  passwordError?: string;
  @Field(() => String, { nullable: true })
  otherError?: string;

  constructor({
    usernameError,
    emailError,
    passwordError,
    otherError,
  }: {
    usernameError?: string;
    emailError?: string;
    passwordError?: string;
    otherError?: string;
  }) {
    this.usernameError = usernameError;
    this.passwordError = passwordError;
    this.emailError = emailError;
    this.otherError = otherError;
  }
}

export const EmailPasswordSignUpResultUnion = createUnionType({
  name: "EmailPasswordSignUpResult",
  types: () => [EmailPasswordSignUpSuccess, EmailPasswordSignUpFailure],
});

export type EmailPasswordSignUpResult =
  | EmailPasswordSignUpSuccess
  | EmailPasswordSignUpFailure;
