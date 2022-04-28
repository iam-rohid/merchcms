import { createUnionType, Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ResetPasswordSuccess {
  @Field(() => String)
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

@ObjectType()
export class ResetPasswordFailure {
  @Field(() => String, { nullable: true })
  tokenError?: string;
  @Field(() => String, { nullable: true })
  newPasswordError?: string;
  @Field(() => String, { nullable: true })
  otherError?: string;

  constructor({
    tokenError,
    newPasswordError,
    otherError,
  }: {
    tokenError?: string;
    newPasswordError?: string;
    otherError?: string;
  }) {
    this.tokenError = tokenError;
    this.newPasswordError = newPasswordError;
    this.otherError = otherError;
  }
}

export const ResetPasswordResultUnion = createUnionType({
  name: "ResetPasswordResult",
  types: () => [ResetPasswordSuccess, ResetPasswordFailure],
});

export type ResetPasswordResult = ResetPasswordSuccess | ResetPasswordFailure;
