import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class FindUserInput {
  @Field(() => ID, { nullable: true })
  id?: string;
  @Field(() => String, { nullable: true })
  username?: string;
  @Field(() => String, { nullable: true })
  email?: string;
}
