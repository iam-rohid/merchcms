import * as nodemailer from "nodemailer";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { emailVerificationTemplate, resetPasswordTemplate } from "./templates";
import { SendMailOptions, Transporter } from "nodemailer";
import {
  APP_URL_KEY,
  SMTP_HOST,
  SMTP_PASSWORD,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
} from "src/utilities/constants";

@Injectable()
export class EmailService {
  private transporter: Transporter;
  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get(SMTP_HOST),
      port: parseInt(this.config.get(SMTP_PORT)),
      secure: this.config.get(SMTP_SECURE) === "true",
      auth: {
        user: this.config.get(SMTP_USER),
        pass: this.config.get(SMTP_PASSWORD),
      },
    });
  }

  async sendEmail(payload: SendMailOptions) {
    try {
      const info = await this.transporter.sendMail({
        ...payload,
        from: payload.from || `MerchCMS <${this.config.get(SMTP_USER)}>`,
      });
      return info;
    } catch (e) {
      throw new InternalServerErrorException("Failed to send email");
    }
  }

  async sendEmailVerificationUrl(token: string, to: string) {
    return this.sendEmail({
      to,
      subject: "Verify your email",
      html: emailVerificationTemplate(token),
    });
  }

  async sendResetPasswordEmail(token: string, to: string) {
    const url = `${this.config.get(APP_URL_KEY)}/auth/reset-password/${token}`;
    return this.sendEmail({
      to,
      subject: "Reset your password",
      html: resetPasswordTemplate(url),
    });
  }
}
