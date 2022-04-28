import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/global/prisma/prisma.service";
import * as argon from "argon2";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { User } from "src/user/models";
import { Payload } from "src/types";
import { isValidEmail, getRandomCode, isStrongPassword } from "src/utilities";
import { JWT_SECRET_KEY } from "src/utilities/constants";
import { EmailService } from "src/global/email/email.service";
import {
  ChangePasswordInput,
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
  ChangePasswordResult,
  ChangePasswordFailure,
  ChangePasswordSuccess,
} from "./results";

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
      return new EmailPasswordSignUpFailure({
        usernameError: !username ? "Username is required" : undefined,
        emailError: !email ? "Email is required" : undefined,
        passwordError: !password ? "Password is required" : undefined,
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
      return new EmailPasswordSignUpFailure({
        usernameError: "Username is already taken",
      });
    }

    // CHECK IF VALID EMAIL
    if (!isValidEmail(email)) {
      return new EmailPasswordSignUpFailure({
        emailError: "Email is not valid",
      });
    }

    // CHECK IF ALREADY EMAIL EXISTS
    const userWithEmail = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
      },
    });
    if (!!userWithEmail) {
      return new EmailPasswordSignUpFailure({
        emailError: "Email already exists",
      });
    }

    // CHECK IF PASSWORD IS STRONG
    if (!isStrongPassword(password)) {
      return new EmailPasswordSignUpFailure({
        passwordError: "Password is not strong enough",
      });
    }

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
        return new EmailPasswordSignUpFailure({
          otherError: "Failed to send verification email",
        });
      }

      // RETURN SUCCESS
      return new EmailPasswordSignUpSuccess(user.email);
    } catch {
      // RETURN FAILURE
      return new EmailPasswordSignUpFailure({
        otherError: "Failed to create user",
      });
    }
  }

  async verifyEmail({
    email,
    token,
  }: EmailVerificationInput): Promise<EmailVerificationResult> {
    // CHECK REQUIRE FIELDS
    if (!email || !token) {
      return new EmailVerificationFailure({
        emailError: !email ? "Email is required" : undefined,
        tokenError: !token ? "Token is required" : undefined,
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
      return new EmailVerificationFailure({
        emailError: "No user with this email",
      });
    }

    // CHECK IF USER IS ALREADY VERIFIED OR NOT
    if (userWithEmail.emailVerified) {
      return new EmailVerificationFailure({
        emailError: "User is already verified",
      });
    }

    // CHECK IF TOKEN IS CORRECT
    if (userWithEmail.emailVerificationToken !== token) {
      return new EmailVerificationFailure({
        emailError: "Invalid verification token",
      });
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
      return new EmailVerificationFailure({
        otherError: "Failed to verify email",
      });
    }
  }

  async eamilPasswordSignIn({
    email,
    password,
  }: EmailPasswordSignInInput): Promise<EmailPasswordSignInResult> {
    // CHECK REQUIRE FIELDS
    if (!email || !password) {
      return new EmailPasswordSignInFailure({
        emailError: !email ? "Email is required" : undefined,
        passwordError: !password ? "Password is required" : undefined,
      });
    }

    if (!isValidEmail(email)) {
      return new EmailPasswordSignInFailure({
        emailError: "Email is not valid",
      });
    }

    // CHECK IF USER EXISTS
    const userWithEmail = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!userWithEmail) {
      return new EmailPasswordSignInFailure({
        emailError: "No user with this email",
      });
    }

    // CHECK IF USER IS VERIFIED
    if (!userWithEmail.emailVerified) {
      return new EmailPasswordSignInFailure({
        emailError: "User is not verified",
      });
    }

    // CHECK IF PASSWORD IS CORRECT
    const isPasswordCorrect = await argon.verify(
      userWithEmail.password,
      password
    );
    if (!isPasswordCorrect) {
      return new EmailPasswordSignInFailure({
        passwordError: "Password is not correct",
      });
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

  async changePassword(
    { oldPassword, newPassword }: ChangePasswordInput,
    userId: string
  ): Promise<ChangePasswordResult> {
    // CHECK REQUIRE FIELDS
    if (!oldPassword || !newPassword) {
      return new ChangePasswordFailure({
        oldPasswordError: !oldPassword ? "Old password is required" : undefined,
        newPasswordError: !newPassword ? "New Password is required" : undefined,
      });
    }

    // CHECK IF USER EXISTS
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        password: true,
      },
    });
    if (!user) {
      return new ChangePasswordFailure({
        otherError: "User not found",
      });
    }

    // CHECK IF PASSWORD IS CORRECT
    const isPasswordCorrect = await argon.verify(user.password, oldPassword);

    if (!isPasswordCorrect) {
      return new ChangePasswordFailure({
        oldPasswordError: "Invalid password",
      });
    }

    // IS NEW PASSWORD STRONG
    if (!isStrongPassword(newPassword)) {
      return new ChangePasswordFailure({
        newPasswordError: "Password is not strong enough",
      });
    }

    // CHANGE PASSWORD
    try {
      const passwordHash = await argon.hash(newPassword);
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          password: passwordHash,
        },
      });
      return new ChangePasswordSuccess("Password changed successfully");
    } catch {
      return new ChangePasswordFailure({
        otherError: "Failed to change password",
      });
    }
  }
}

// TODO's
// 1. Send verification code to email ✅
// 2. Generate token ✅
// 4. Check password strength ✅
// 5. Resend verification code ✅
// 6. Verify email ✅
// 7. Sign in ✅
// 8. Sign up ✅
// 9. Change password ✅
// 10. Forgot password
