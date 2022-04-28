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
  ResetPasswordInput,
  SendResetPasswordEmailInput,
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
  SendResetPasswordEmailSuccess,
  SendResetPasswordEmailResult,
  SendResetPasswordEmailFailure,
  ResetPasswordResult,
  ResetPasswordFailure,
  ResetPasswordSuccess,
} from "./results";
import { EmailVerificationToken } from "@prisma/client";

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
        },
      });

      // GENERATE TOKEN
      const emailVerificationToken = await this.createEmailVerificationToken(
        userWithEmail.id
      );

      // SEND VERIFICATION CODE TO EMAIL
      try {
        await this.sendVerificationEmail(
          user.email,
          emailVerificationToken.token
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
    const emailVerificationToken =
      await this.prisma.emailVerificationToken.findUnique({
        where: {
          token,
        },
        select: {
          isValid: true,
          user: {
            select: {
              id: true,
            },
          },
        },
      });

    if (
      !emailVerificationToken ||
      emailVerificationToken.user.id !== userWithEmail.id ||
      !emailVerificationToken.isValid
    ) {
      return new EmailVerificationFailure({
        tokenError: "Token is not valid",
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

      // MAKE TOKEN INVALID
      await this.prisma.emailVerificationToken.update({
        where: {
          token,
        },
        data: {
          isValid: false,
        },
      });

      // TODO: GENERATE ACCESS TOKEN
      const accessToken = await this.signToken(user);
      // RETURN SUCCESS
      return new EmailVerificationSuccess(user, accessToken);
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
      // GENERATE TOKEN
      const emailVerificationToken = await this.createEmailVerificationToken(
        user.id
      );

      await this.sendVerificationEmail(
        user.email,
        emailVerificationToken.token
      );
      return new ResendVerificationEmailSuccess("Email sent successfully");
    } catch {
      return new ResendVerificationEmailFailure("Failed to send email");
    }
  }

  async createEmailVerificationToken(
    userId: string
  ): Promise<EmailVerificationToken> {
    const emailVerificationToken =
      await this.prisma.emailVerificationToken.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          token: getRandomCode(5),
        },
      });
    return emailVerificationToken;
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

  async sendResetPasswordEmail({
    email,
  }: SendResetPasswordEmailInput): Promise<SendResetPasswordEmailResult> {
    // Field validation
    if (!email) {
      return new SendResetPasswordEmailFailure({
        emailError: "Email is required",
      });
    }
    if (!isValidEmail(email)) {
      return new SendResetPasswordEmailFailure({
        emailError: "Email is not valid",
      });
    }

    // CHECK IF USER EXISTS
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        emailVerified: true,
      },
    });

    if (!user) {
      return new SendResetPasswordEmailFailure({
        emailError: "No user with this email",
      });
    }

    // CHECK IF USER IS VERIFIED
    if (!user.emailVerified) {
      return new SendResetPasswordEmailFailure({
        otherError: "User is not verified",
      });
    }

    // GENERATE TOKEN
    const resetPasswordToken = await this.prisma.resetPasswordToken.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    // SEND EMAIL
    try {
      await this.emailService.sendResetPasswordEmail(
        resetPasswordToken.token,
        email
      );
      return new SendResetPasswordEmailSuccess(
        "Forgot password email sent successfully"
      );
    } catch {
      return new SendResetPasswordEmailFailure({
        otherError: "Failed to send email",
      });
    }
  }

  async resetPassword({
    token,
    newPassword,
  }: ResetPasswordInput): Promise<ResetPasswordResult> {
    // CHECK REQUIRE FIELDS
    if (!token || !newPassword) {
      return new ResetPasswordFailure({
        tokenError: !token ? "Token is required" : undefined,
        newPasswordError: !newPassword ? "New Password is required" : undefined,
      });
    }

    // CHECK IF TOKEN EXISTS
    const resetPasswordToken = await this.prisma.resetPasswordToken.findUnique({
      where: { token },
      select: {
        id: true,
        user: {
          select: {
            id: true,
          },
        },
        isValid: true,
      },
    });

    if (!resetPasswordToken) {
      return new ResetPasswordFailure({
        tokenError: "Token not found",
      });
    }

    // CHECK IF TOKEN IS VALID
    if (!resetPasswordToken.isValid) {
      return new ResetPasswordFailure({
        tokenError: "Token is not valid",
      });
    }

    // CHECK IF USER EXISTS
    const user = await this.prisma.user.findUnique({
      where: { id: resetPasswordToken.user.id },
      select: {
        id: true,
        emailVerified: true,
      },
    });

    if (!user) {
      return new ResetPasswordFailure({
        otherError: "User not found",
      });
    }

    // CHECK IF USER IS VERIFIED
    if (!user.emailVerified) {
      return new ResetPasswordFailure({
        otherError: "User is not verified",
      });
    }

    // IS NEW PASSWORD STRONG
    if (!isStrongPassword(newPassword)) {
      return new ResetPasswordFailure({
        newPasswordError: "Password is not strong enough",
      });
    }

    // CHANGE PASSWORD
    try {
      const passwordHash = await argon.hash(newPassword);
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          password: passwordHash,
        },
      });

      // Make Reset Password Token inactive
      await this.prisma.resetPasswordToken.update({
        where: { id: resetPasswordToken.id },
        data: {
          isValid: false,
        },
      });
      return new ResetPasswordSuccess("Password changed successfully");
    } catch {
      return new ResetPasswordFailure({
        otherError: "Failed to reset password",
      });
    }
  }
}
