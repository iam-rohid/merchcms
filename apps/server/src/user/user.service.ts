import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/global/prisma/prisma.service";
import { User } from "@prisma/client";
import { Profile } from "src/profile/models";
import { FindUserFailure, FindUserResult, FindUserSuccess } from "./results";
import { FindUserInput } from "./inputs";
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserWithEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async findUser({
    id,
    username,
    email,
  }: FindUserInput): Promise<FindUserResult> {
    if (!id && !username && !email) {
      return new FindUserFailure(
        "At least one of the fields must be specified"
      );
    }
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          OR: [{ id }, { username }, { email }],
        },
      });
      if (!user) {
        return new FindUserFailure("User not found");
      }
      return new FindUserSuccess(user);
    } catch {
      return new FindUserFailure("Failed to find user");
    }
  }

  async getProfile(userId: string): Promise<Profile> {
    return this.prisma.profile.findUnique({
      where: {
        userId,
      },
    });
  }
}
