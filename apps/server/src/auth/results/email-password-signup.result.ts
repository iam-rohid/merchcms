import { createUnionType, Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class EmailPasswordSignUpSuccess {
  @Field(() => String)
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

@ObjectType()
export class EmailPasswordSignUpFailure {
  @Field(() => String, { nullable: true })
  username?: string;
  @Field(() => String, { nullable: true })
  email?: string;
  @Field(() => String, { nullable: true })
  password?: string;
  @Field(() => String, { nullable: true })
  other?: string;

  constructor({
    username,
    email,
    password,
    other,
  }: {
    username?: string;
    email?: string;
    password?: string;
    other?: string;
  }) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.other = other;
  }

  static invalidEmail(): EmailPasswordSignUpFailure {
    return new EmailPasswordSignUpFailure({
      email: "Invalid email",
    });
  }
  static emailAlreadyExists(): EmailPasswordSignUpFailure {
    return new EmailPasswordSignUpFailure({
      email: "Email already exists",
    });
  }
  static usernameAlreadyExists(): EmailPasswordSignUpFailure {
    return new EmailPasswordSignUpFailure({
      username: "Username already exists",
    });
  }
  static passwordIsNotStrong(): EmailPasswordSignUpFailure {
    return new EmailPasswordSignUpFailure({
      password: "Password is not strong",
    });
  }
  static other(other: string): EmailPasswordSignUpFailure {
    return new EmailPasswordSignUpFailure({
      other,
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
      password: password && "Password is required",
      email: email && "Email is required",
      username: username && "Username is required",
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
