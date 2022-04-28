import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/global/prisma/prisma.service";
import {
  EmailPasswordSignInInput,
  EmailPasswordSignUpInput,
  EmailVerificationInput,
} from "./input";
import {
  EmailPasswordSignInFailure,
  EmailPasswordSignInResult,
  EmailPasswordSignUpFailure,
  EmailPasswordSignUpResult,
  EmailPasswordSignUpSuccess,
  EmailVerificationFailure,
  EmailVerificationResult,
  EmailVerificationSuccess,
} from "./results";
import * as argon from "argon2";
import { isValidEmail, getRandomCode } from "src/utilities";

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async eamilPasswordSignUp({
    email,
    password,
    username,
  }: EmailPasswordSignUpInput): Promise<EmailPasswordSignUpResult> {
    // CHECK IF USERNAME PROVIDED
    if (!username) {
      return EmailPasswordSignUpFailure.requiredFields({
        username: true,
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

    // CHECK IF EMAIL PROVIDED
    if (!email) {
      return EmailPasswordSignUpFailure.requiredFields({
        email: true,
      });
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
      console.log("User created", user);
      console.log("User Code", user.emailVerificationToken);

      // RETURN SUCCESS
      return new EmailPasswordSignUpSuccess(
        "Sign up successful. We sent you an email to verify your account."
      );
    } catch {
      // RETURN FAILURE
      return EmailPasswordSignUpFailure.other("Sign up failed");
    }
  }

  async verifyEmail({
    email,
    token,
  }: EmailVerificationInput): Promise<EmailVerificationResult> {
    // CHECK IF EMAIL PROVIDED
    if (!email) {
      return EmailVerificationFailure.requiredFields({
        email: true,
      });
    }

    // CHECK IF TOKEN PROVIDED
    if (!token) {
      return EmailVerificationFailure.requiredFields({
        token: true,
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

      // TOOD: GENERATE TOKEN
      const token = "SecretToken";
      // RETURN SUCCESS
      return new EmailVerificationSuccess({
        token,
        user,
        message: "Email verified successfully",
      });
    } catch {
      // RETURN FAILURE
      return EmailVerificationFailure.other("Email verification failed");
    }
  }

  async eamilPasswordSignIn(
    input: EmailPasswordSignInInput
  ): Promise<EmailPasswordSignInResult> {
    // CHECK IF EMAIL EXISTS
    // CHECK IF PASSWORD IS CORRECT
    // GENERATE TOKEN
    // RETURN SUCCESS
    // RETURN FAILURE
    return new EmailPasswordSignInFailure({
      email: "Email not found",
    });
  }
}
