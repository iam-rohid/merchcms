import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/models";

@ObjectType()
export class Profile {
  @Field(() => ID)
  id: string;
  @Field(() => Date)
  createdAt: Date;
  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => User, { nullable: true })
  user?: User;
  @Field(() => ID)
  userId: string;
}
