import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/global/prisma/prisma.service";
import * as argon from "argon2";
import { isValidEmail, getRandomCode } from "src/utilities";
import {
  EmailPasswordSignInInput,
  EmailPasswordSignUpInput,
  EmailVerificationInput,
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
} from "./results";

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

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
      console.log("User created", user);
      console.log("User Code", user.emailVerificationToken);

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
      const token = "SecretToken";
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
    const token = "SecretToken";

    // RETURN SUCCESS
    return new EmailPasswordSignInSuccess(userWithEmail, token);
  }
}

// TODO's
// 1. Send verification code to email
// 2. Generate token
// 3. Verify token
// 4. Check password strength
