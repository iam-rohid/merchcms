import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JWT, JWT_SECRET_KEY } from "src/utilities/constants";
import { PrismaService } from "src/global/prisma/prisma.service";
import { Payload } from "src/utilities/types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT) {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get(JWT_SECRET_KEY),
    });
  }

  async validate(payload: Payload & { iat: number; exp: number }) {
    if (payload.exp * 1000 < Date.now()) {
      throw new UnauthorizedException();
    }
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: payload.id },
      });
      if (!user || !user.emailVerified) {
        throw new UnauthorizedException();
      }
      return user;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
