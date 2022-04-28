import { createUnionType, Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ChangePasswordSuccess {
  @Field(() => String)
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

@ObjectType()
export class ChangePasswordFailure {
  @Field(() => String, { nullable: true })
  oldPasswordError?: string;
  @Field(() => String, { nullable: true })
  newPasswordError?: string;
  @Field(() => String, { nullable: true })
  otherError?: string;

  constructor({
    oldPasswordError,
    newPasswordError,
    otherError,
  }: {
    oldPasswordError?: string;
    newPasswordError?: string;
    otherError?: string;
  }) {
    this.oldPasswordError = oldPasswordError;
    this.newPasswordError = newPasswordError;
    this.otherError = otherError;
  }
}

export const ChangePasswordResultUnion = createUnionType({
  name: "ChangePasswordResult",
  types: () => [ChangePasswordSuccess, ChangePasswordFailure],
});

export type ChangePasswordResult =
  | ChangePasswordSuccess
  | ChangePasswordFailure;
