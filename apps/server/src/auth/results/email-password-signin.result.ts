import { createUnionType, Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/models";

@ObjectType()
export class EmailPasswordSignInSuccess {
  @Field(() => User)
  user: User;
  @Field(() => String)
  token: string;

  constructor(user: User, token: string) {
    this.user = user;
    this.token = token;
  }
}

@ObjectType()
export class EmailPasswordSignInFailure {
  @Field(() => String, { nullable: true })
  email?: string;
  @Field(() => String, { nullable: true })
  password?: string;
  @Field(() => String, { nullable: true })
  other?: string;

  constructor({
    email,
    password,
    other,
  }: {
    email?: string;
    password?: string;
    other?: string;
  }) {
    this.password = password;
    this.email = email;
    this.other = other;
  }
}

export const EmailPasswordSignInResultUnion = createUnionType({
  name: "EmailPasswordSignInResult",
  types: () => [EmailPasswordSignInSuccess, EmailPasswordSignInFailure],
});

export type EmailPasswordSignInResult =
  | EmailPasswordSignInSuccess
  | EmailPasswordSignInFailure;
