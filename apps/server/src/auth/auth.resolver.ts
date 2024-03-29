import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { User } from "src/user/models";
import { CurrentUser } from "src/utilities/decorators/current-user.decorator";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./gourds/jwt-auth.gourds";
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
  EmailPasswordSignUpResult,
  EmailPasswordSignUpResultUnion,
  EmailPasswordSignInResultUnion,
  EmailPasswordSignInResult,
  EmailVerificationResultUnion,
  EmailVerificationResult,
  ResendVerificationEmailResultUnion,
  ResendVerificationEmailResult,
  ChangePasswordResultUnion,
  ChangePasswordResult,
  SendResetPasswordEmailResultUnion,
  SendResetPasswordEmailResult,
  ResetPasswordResultUnion,
  ResetPasswordResult,
} from "./results";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => EmailPasswordSignUpResultUnion)
  emailPasswordSignUp(
    @Args("input") input: EmailPasswordSignUpInput
  ): Promise<EmailPasswordSignUpResult> {
    return this.authService.emailPasswordSignUp(input);
  }

  @Mutation(() => EmailPasswordSignInResultUnion)
  emailPasswordSignIn(
    @Args("input") input: EmailPasswordSignInInput
  ): Promise<EmailPasswordSignInResult> {
    return this.authService.emailPasswordSignIn(input);
  }

  @Mutation(() => EmailVerificationResultUnion)
  verifyEmail(
    @Args("input") input: EmailVerificationInput
  ): Promise<EmailVerificationResult> {
    return this.authService.verifyEmail(input);
  }

  @Mutation(() => ResendVerificationEmailResultUnion)
  resendVerificationEmail(
    @Args("input") input: ResendVerificationEmailInput
  ): Promise<ResendVerificationEmailResult> {
    return this.authService.resendVerificationEmail(input);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ChangePasswordResultUnion)
  changePassword(
    @Args("input") input: ChangePasswordInput,
    @CurrentUser() { id }: User
  ): Promise<ChangePasswordResult> {
    return this.authService.changePassword(input, id);
  }

  @Mutation(() => SendResetPasswordEmailResultUnion)
  sendResetPasswordEmail(
    @Args("input") input: SendResetPasswordEmailInput
  ): Promise<SendResetPasswordEmailResult> {
    return this.authService.sendResetPasswordEmail(input);
  }

  @Mutation(() => ResetPasswordResultUnion)
  resetPassword(
    @Args("input") input: ResetPasswordInput
  ): Promise<ResetPasswordResult> {
    return this.authService.resetPassword(input);
  }
}
