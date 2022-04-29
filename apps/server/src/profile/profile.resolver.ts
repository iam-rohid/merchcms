import { UseGuards } from "@nestjs/common";
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/gourds/jwt-auth.gourds";
import { User } from "src/user/models";
import { CurrentUser } from "src/utilities/decorators/current-user.decorator";
import { FindProfileInput, UpdateProfileInput } from "./inputs";
import { Profile } from "./models";
import { ProfileService } from "./profile.service";
import {
  FindProfileResult,
  FindProfileResultUnion,
  UpdateProfileResult,
  UpdateProfileResultUnion,
} from "./results";

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

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UpdateProfileResultUnion)
  async updateProfile(
    @CurrentUser() user: User,
    @Args("input") input: UpdateProfileInput
  ): Promise<UpdateProfileResult> {
    return this.profileService.updateProfile(input, user.id);
  }

  @ResolveField(() => User)
  user(@Parent() { userId }: Profile): Promise<User> {
    return this.profileService.getUser(userId);
  }
}
