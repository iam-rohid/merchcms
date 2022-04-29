import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/global/prisma/prisma.service";
import { User } from "src/user/models";
import { FindProfileInput, UpdateProfileInput } from "./inputs";
import { Profile } from "./models";
import {
  FindProfileFailure,
  FindProfileResult,
  FindProfileSuccess,
  UpdateProfileFailure,
  UpdateProfileResult,
  UpdateProfileSuccess,
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

  async updateProfile(
    { id, name, bio }: UpdateProfileInput,
    userId: string
  ): Promise<UpdateProfileResult> {
    if (!name && !bio) {
      return new UpdateProfileFailure({
        otherError: "Nothing to update",
      });
    }

    if (name && name.length > 50) {
      return new UpdateProfileFailure({
        otherError: "Name must be less than 50 characters",
      });
    }
    if (name && name.length < 3) {
      return new UpdateProfileFailure({
        otherError: "Name must be at least 3 characters",
      });
    }

    if (bio && bio.length > 500) {
      return new UpdateProfileFailure({
        otherError: "Bio must be less than 500 characters",
      });
    }
    if (bio && bio.length < 20) {
      return new UpdateProfileFailure({
        otherError: "Bio must be at least 20 characters",
      });
    }

    const profile = await this.prisma.profile.findUnique({
      where: {
        id,
      },
    });

    if (!profile) {
      return new UpdateProfileFailure({
        otherError: "Profile not found",
      });
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || (user.role !== "ADMIN" && profile.userId !== user.id)) {
      return new UpdateProfileFailure({
        otherError: "You are not allowed to update this profile",
      });
    }

    try {
      const updatedProfile = await this.prisma.profile.update({
        where: {
          id,
        },
        data: {
          name,
          bio,
        },
      });
      return new UpdateProfileSuccess(updatedProfile);
    } catch {
      return new UpdateProfileFailure({
        otherError: "Failed to update profile",
      });
    }
  }

  async getUser(userId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }
}
