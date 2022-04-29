import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Profile } from "src/profile/models";
import { Role } from "src/utilities/enums";

@ObjectType()
export class User {
  @Field(() => ID)
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
  @Field(() => Role)
  role: string;

  password: string;

  @Field(() => Profile, { nullable: true })
  profile?: Profile;
}
