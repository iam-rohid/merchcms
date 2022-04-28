import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/global/prisma/prisma.service";
import { User } from "@prisma/client";
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
}
