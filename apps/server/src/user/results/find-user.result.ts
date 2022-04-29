import { createUnionType, Field, ObjectType } from "@nestjs/graphql";
import { User } from "../models";

@ObjectType()
export class FindUserSuccess {
  @Field(() => User)
  user: User;

  constructor(user: User) {
    this.user = user;
  }
}

@ObjectType()
export class FindUserFailure {
  @Field(() => String)
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export const FindUserResultUnion = createUnionType({
  name: "FindUserResult",
  types: () => [FindUserSuccess, FindUserFailure],
});

export type FindUserResult = FindUserSuccess | FindUserFailure;
