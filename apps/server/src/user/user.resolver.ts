import { UseGuards } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/gourds/jwt-auth.gourds";
import { CurrentUser } from "src/utilities/decorators/current-user.decorator";
import { User } from "./models";
import { UserService } from "./user.service";

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => User)
  currentUser(@CurrentUser() user: User) {
    return user;
  }
}
