import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateProfileInput {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => String, { nullable: true })
  bio?: string;
}
