import { createUnionType, Field, ObjectType } from "@nestjs/graphql";
import { Profile } from "../models";

@ObjectType()
export class UpdateProfileSuccess {
  @Field(() => Profile)
  updatedProfile: Profile;

  constructor(profile: Profile) {
    this.updatedProfile = profile;
  }
}

@ObjectType()
export class UpdateProfileFailure {
  @Field(() => String, { nullable: true })
  otherError: string;
  @Field(() => String, { nullable: true })
  nameError: string;

  constructor({
    otherError,
    nameError,
  }: {
    otherError?: string;
    nameError?: string;
  }) {
    this.otherError = otherError;
    this.nameError = nameError;
  }
}

export const UpdateProfileResultUnion = createUnionType({
  name: "UpdateProfileResult",
  types: () => [UpdateProfileSuccess, UpdateProfileFailure],
});

export type UpdateProfileResult = UpdateProfileSuccess | UpdateProfileFailure;
