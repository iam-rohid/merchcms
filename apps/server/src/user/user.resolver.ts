import { UseGuards } from "@nestjs/common";
import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/gourds/jwt-auth.gourds";
import { Profile } from "src/profile/models";
import { CurrentUser } from "src/utilities/decorators/current-user.decorator";
import { FindUserInput } from "./inputs";
import { User } from "./models";
import { FindUserResult, FindUserResultUnion } from "./results";
import { UserService } from "./user.service";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => User)
  currentUser(@CurrentUser() user: User) {
    return user;
  }

  @Query(() => FindUserResultUnion)
  findUser(@Args("input") input: FindUserInput): Promise<FindUserResult> {
    return this.userService.findUser(input);
  }

  @ResolveField(() => Profile)
  profile(@Parent() { id }: User): Promise<Profile> {
    return this.userService.getProfile(id);
  }
}
