import { createUnionType, Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/models";

@ObjectType()
export class EmailVerificationSuccess {
  @Field(() => String)
  message: string;
  @Field(() => User)
  user: User;
  @Field(() => String)
  token: string;

  constructor({
    message,
    user,
    token,
  }: {
    message: string;
    user: User;
    token: string;
  }) {
    this.message = message;
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
  static requiredFields(fields: {
    [key: string]: boolean;
  }): EmailVerificationFailure {
    const failure = new EmailVerificationFailure({});
    Object.keys(fields).forEach((field) => {
      if (fields[field]) {
        failure[field] = field;
      }
    });
    return failure;
  }

  static invalidEmail(): EmailVerificationFailure {
    return new EmailVerificationFailure({
      emailError: "Email is invalid",
    });
  }
  static userNotFound(): EmailVerificationFailure {
    return new EmailVerificationFailure({
      emailError: "No user found",
    });
  }
  static userIsAlreadyVeirfied(): EmailVerificationFailure {
    return new EmailVerificationFailure({
      emailError: "The user with this email is already verified",
    });
  }
  static invalidToken(): EmailVerificationFailure {
    return new EmailVerificationFailure({
      tokenError: "Token is invalid",
    });
  }
  static other(other = "Something went wrong"): EmailVerificationFailure {
    return new EmailVerificationFailure({
      otherError: other,
    });
  }
}

export const EmailVerificationResultUnion = createUnionType({
  name: "EmailVerificationResult",
  types: () => [EmailVerificationSuccess, EmailVerificationFailure],
});

export type EmailVerificationResult =
  | EmailVerificationSuccess
  | EmailVerificationFailure;
