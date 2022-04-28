import { createUnionType, Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ForgotPasswordSuccess {
  @Field(() => String)
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

@ObjectType()
export class ForgotPasswordFailure {
  @Field(() => String)
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export const ForgotPasswordResultUnion = createUnionType({
  name: "ForgotPasswordResult",
  types: () => [ForgotPasswordSuccess, ForgotPasswordFailure],
});

export type ForgotPasswordResult =
  | ForgotPasswordSuccess
  | ForgotPasswordFailure;
