import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { EmailService } from "./email/email.service";

@Global()
@Module({
  providers: [PrismaService, EmailService],
  exports: [PrismaService, EmailService],
})
export class GlobalModule {}
