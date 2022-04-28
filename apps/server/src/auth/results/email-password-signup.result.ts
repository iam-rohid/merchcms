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

  static invalidEmail(): EmailPasswordSignUpFailure {
    return new EmailPasswordSignUpFailure({
      emailError: "Email is not valid",
    });
  }

  static emailAlreadyExists(): EmailPasswordSignUpFailure {
    return new EmailPasswordSignUpFailure({
      emailError: "Email already exists",
    });
  }

  static usernameAlreadyExists(): EmailPasswordSignUpFailure {
    return new EmailPasswordSignUpFailure({
      usernameError: "Username already taken",
    });
  }

  static passwordIsNotStrong(): EmailPasswordSignUpFailure {
    return new EmailPasswordSignUpFailure({
      passwordError: "Password is not strong",
    });
  }

  static otherError(error: string): EmailPasswordSignUpFailure {
    return new EmailPasswordSignUpFailure({
      otherError: error,
    });
  }

  static requiredFields({
    username,
    password,
    email,
  }: {
    username?: boolean;
    password?: boolean;
    email?: boolean;
  }): EmailPasswordSignUpFailure {
    return new EmailPasswordSignUpFailure({
      passwordError: password && "Password is required",
      emailError: email && "Email is required",
      usernameError: username && "Username is required",
    });
  }
}

export const EmailPasswordSignUpResultUnion = createUnionType({
  name: "EmailPasswordSignUpResult",
  types: () => [EmailPasswordSignUpSuccess, EmailPasswordSignUpFailure],
});

export type EmailPasswordSignUpResult =
  | EmailPasswordSignUpSuccess
  | EmailPasswordSignUpFailure;
