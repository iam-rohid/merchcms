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
  @Field(() => String)
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

export const ResendVerificationEmailResultUnion = createUnionType({
  name: "ResendVerificationEmailResult",
  types: () => [ResendVerificationEmailSuccess, ResendVerificationEmailFailure],
});

export type ResendVerificationEmailResult =
  | ResendVerificationEmailSuccess
  | ResendVerificationEmailFailure;
