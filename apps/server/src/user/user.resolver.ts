import { UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/gourds/jwt-auth.gourds";
import { Profile } from "src/profile/models";
import { CurrentUser } from "src/utilities/decorators/current-user.decorator";
import { User } from "./models";
import { UserService } from "./user.service";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => User)
  currentUser(@CurrentUser() user: User) {
    return user;
  }

  @ResolveField(() => Profile)
  profile(@Parent() { id }: User): Promise<Profile> {
    return this.userService.getProfile(id);
  }
}
