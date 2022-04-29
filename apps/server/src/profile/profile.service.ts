import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/global/prisma/prisma.service";
import { User } from "src/user/models";
import { FindProfileInput } from "./inputs";
import { Profile } from "./models";
import {
  FindProfileFailure,
  FindProfileResult,
  FindProfileSuccess,
} from "./results";

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  getProfileByUserId(userId: string): Promise<Profile> {
    return this.prisma.profile.findUnique({
      where: {
        userId,
      },
    });
  }

  async findProfile({
    id,
    userId,
    username,
  }: FindProfileInput): Promise<FindProfileResult> {
    if (!id && !userId && !username) {
      return new FindProfileFailure(
        "At least one of the fields must be specified"
      );
    }
    try {
      const profile = await this.prisma.profile.findFirst({
        where: {
          id,
          user: {
            id: userId,
            username,
          },
        },
      });
      if (!profile) {
        return new FindProfileFailure("Profile not found");
      }
      return new FindProfileSuccess(profile);
    } catch {
      return new FindProfileFailure("Failed to find profile");
    }
  }

  getUser(userId: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
}
