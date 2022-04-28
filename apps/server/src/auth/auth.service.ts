import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/global/prisma/prisma.service";
import * as argon from "argon2";
import { isValidEmail, getRandomCode } from "src/utilities";
import {
  EmailPasswordSignInInput,
  EmailPasswordSignUpInput,
  EmailVerificationInput,
  ResendVerificationEmailInput,
} from "./input";
import {
  EmailPasswordSignInFailure,
  EmailPasswordSignInResult,
  EmailPasswordSignInSuccess,
  EmailPasswordSignUpFailure,
  EmailPasswordSignUpResult,
  EmailPasswordSignUpSuccess,
  EmailVerificationFailure,
  EmailVerificationResult,
  EmailVerificationSuccess,
  ResendVerificationEmailFailure,
  ResendVerificationEmailSuccess,
  ResendVerificationEmailResult,
} from "./results";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { User } from "src/user/models";
import { Payload } from "src/types";
import { JWT_SECRET_KEY } from "src/utilities/constants";
import { EmailService } from "src/global/email/email.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly emailService: EmailService
  ) {}

  async eamilPasswordSignUp({
    email,
    password,
    username,
  }: EmailPasswordSignUpInput): Promise<EmailPasswordSignUpResult> {
    // CHECK REQUIRE FIELDS
    if (!username || !email || !password) {
      return EmailPasswordSignUpFailure.requiredFields({
        username: !username || undefined,
        email: !email || undefined,
        password: !password || undefined,
      });
    }

    // CHECK IF USERNAME IS TAKEN
    const userWithUsername = await this.prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
      },
    });
    if (!!userWithUsername) {
      return EmailPasswordSignUpFailure.usernameAlreadyExists();
    }

    // CHECK IF VALID EMAIL
    if (!isValidEmail(email)) {
      return EmailPasswordSignUpFailure.invalidEmail();
    }

    // CHECK IF ALREADY EMAIL EXISTS
    const userWithEmail = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
      },
    });
    if (!!userWithEmail) {
      return EmailPasswordSignUpFailure.emailAlreadyExists();
    }

    // CHECK IF PASSWORD IS STRONG
    // if (!isStrongPassword(password)) {
    //   return EmailPasswordSignUpFailure.passwordIsNotStrong();
    // }

    // HASH PASSWORD
    const passwordHash = await argon.hash(password);

    // CREATE USER
    try {
      const user = await this.prisma.user.create({
        data: {
          username,
          email,
          password: passwordHash,
          emailVerificationToken: getRandomCode(),
        },
      });

      // TODO: SEND VERIFICATION CODE TO EMAIL
      try {
        await this.sendVerificationEmail(
          user.email,
          user.emailVerificationToken
        );
      } catch {
        return EmailPasswordSignUpFailure.otherError("Failed to send email");
      }

      // RETURN SUCCESS
      return new EmailPasswordSignUpSuccess(user.email);
    } catch {
      // RETURN FAILURE
      return EmailPasswordSignUpFailure.otherError("Sign up failed");
    }
  }

  async verifyEmail({
    email,
    token,
  }: EmailVerificationInput): Promise<EmailVerificationResult> {
    // CHECK REQUIRE FIELDS
    if (!email || !token) {
      return EmailVerificationFailure.requiredFields({
        email: !email || undefined,
        token: !token || undefined,
      });
    }

    // CHECK IF EMAIL EXISTS
    const userWithEmail = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        emailVerificationToken: true,
        emailVerified: true,
      },
    });
    if (!userWithEmail) {
      return EmailVerificationFailure.userNotFound();
    }

    // CHECK IF USER IS ALREADY VERIFIED OR NOT
    if (userWithEmail.emailVerified) {
      return EmailVerificationFailure.userIsAlreadyVeirfied();
    }

    // CHECK IF TOKEN IS CORRECT
    if (userWithEmail.emailVerificationToken !== token) {
      return EmailVerificationFailure.invalidToken();
    }

    // VERIFY EMAIL
    try {
      const user = await this.prisma.user.update({
        where: {
          id: userWithEmail.id,
        },
        data: {
          emailVerified: true,
        },
      });

      // TODO: GENERATE TOKEN
      const token = await this.signToken(user);
      // RETURN SUCCESS
      return new EmailVerificationSuccess(user, token);
    } catch {
      // RETURN FAILURE
      return EmailVerificationFailure.other();
    }
  }

  async eamilPasswordSignIn({
    email,
    password,
  }: EmailPasswordSignInInput): Promise<EmailPasswordSignInResult> {
    // CHECK REQUIRE FIELDS
    if (!email || !password) {
      return EmailPasswordSignInFailure.requiredFields({
        email: !email || undefined,
        password: !password || undefined,
      });
    }

    if (!isValidEmail(email)) {
      return EmailPasswordSignInFailure.invalidEmail();
    }

    // CHECK IF USER EXISTS
    const userWithEmail = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!userWithEmail) {
      return EmailPasswordSignInFailure.userNotFound();
    }

    // CHECK IF USER IS VERIFIED
    if (!userWithEmail.emailVerified) {
      return EmailPasswordSignInFailure.userIsNotVerified();
    }

    // CHECK IF PASSWORD IS CORRECT
    const isPasswordCorrect = await argon.verify(
      userWithEmail.password,
      password
    );
    if (!isPasswordCorrect) {
      return EmailPasswordSignInFailure.invalidPassword();
    }

    // TODO: GENERATE TOKEN
    const token = await this.signToken(userWithEmail);

    // RETURN SUCCESS
    return new EmailPasswordSignInSuccess(userWithEmail, token);
  }

  async signToken(user: User): Promise<string> {
    const payload: Payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = await this.jwtService.sign(payload, {
      expiresIn: 3.154e10, // 1 years
      secret: this.config.get(JWT_SECRET_KEY),
    });
    return token;
  }

  async resendVerificationEmail({
    email,
  }: ResendVerificationEmailInput): Promise<ResendVerificationEmailResult> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        emailVerificationToken: true,
        emailVerified: true,
      },
    });

    if (!user) {
      return new ResendVerificationEmailFailure("User not found");
    }

    if (user.emailVerified) {
      return new ResendVerificationEmailFailure("User is already verified");
    }

    try {
      await this.sendVerificationEmail(user.email, user.emailVerificationToken);
      return new ResendVerificationEmailSuccess("Email sent successfully");
    } catch {
      return new ResendVerificationEmailFailure("Failed to send email");
    }
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    await this.emailService.sendEmailVerificationUrl(token, email);
    console.log("Verification Code Sent to ", email, token);
  }
}

// TODO's
// 1. Send verification code to email ✅
// 2. Generate token ✅
// 4. Check password strength
// 5. Resend verification code ✅
