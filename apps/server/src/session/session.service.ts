import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/global/prisma/prisma.service";

@Injectable()
export class SessionService {
  constructor(private readonly prismaService: PrismaService) {}
}
