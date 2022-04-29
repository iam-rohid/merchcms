import { UseGuards } from "@nestjs/common";
import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/gourds/jwt-auth.gourds";
import { User } from "src/user/models";
import { CurrentUser } from "src/utilities/decorators/current-user.decorator";
import { FindProfileInput } from "./inputs";
import { Profile } from "./models";
import { ProfileService } from "./profile.service";
import { FindProfileResult, FindProfileResultUnion } from "./results";

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => Profile)
  currentProfile(@CurrentUser() user: User): Promise<Profile> {
    return this.profileService.getProfileByUserId(user.id);
  }

  @Query(() => FindProfileResultUnion)
  findProfile(
    @Args("input") input: FindProfileInput
  ): Promise<FindProfileResult> {
    return this.profileService.findProfile(input);
  }

  @ResolveField(() => User)
  user(@Parent() { userId }: Profile): Promise<User> {
    return this.profileService.getUser(userId);
  }
}
