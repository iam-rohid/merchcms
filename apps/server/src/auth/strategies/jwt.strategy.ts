import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { JWT, JWT_SECRET_KEY } from "src/utilities/constants";
import { PrismaService } from "src/global/prisma/prisma.service";
import { Payload } from "src/types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT) {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get(JWT_SECRET_KEY),
    });
  }

  async validate(payload: Payload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.id },
    });
    return user;
  }
}
