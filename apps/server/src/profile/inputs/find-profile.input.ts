import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class FindProfileInput {
  @Field(() => ID, { nullable: true })
  id?: string;
  @Field(() => ID, { nullable: true })
  userId?: string;
  @Field(() => String, { nullable: true })
  username?: string;
}
