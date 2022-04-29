import { createUnionType, Field, ObjectType } from "@nestjs/graphql";
import { Profile } from "../models";

@ObjectType()
export class FindProfileSuccess {
  @Field(() => Profile)
  profile: Profile;

  constructor(profile: Profile) {
    this.profile = profile;
  }
}

@ObjectType()
export class FindProfileFailure {
  @Field(() => String)
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export const FindProfileResultUnion = createUnionType({
  name: "FindProfileResult",
  types: () => [FindProfileSuccess, FindProfileFailure],
});

export type FindProfileResult = FindProfileSuccess | FindProfileFailure;
