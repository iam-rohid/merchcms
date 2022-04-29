import { Field, ObjectType } from "@nestjs/graphql";
import { Profile } from "src/profile/models";

@ObjectType()
export class User {
  @Field(() => String)
  id: string;
  @Field(() => Date)
  createdAt: Date;
  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String)
  username: string;
  @Field(() => String)
  email: string;
  @Field(() => Boolean)
  emailVerified: boolean;

  password: string;

  @Field(() => Profile, { nullable: true })
  profile?: Profile;
}
