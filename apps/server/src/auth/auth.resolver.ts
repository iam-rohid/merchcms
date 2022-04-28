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
} from "./results";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => EmailPasswordSignUpResultUnion)
  eamilPasswordSignUp(
    @Args("input") input: EmailPasswordSignUpInput
  ): Promise<EmailPasswordSignUpResult> {
    return this.authService.eamilPasswordSignUp(input);
  }

  @Mutation(() => EmailPasswordSignInResultUnion)
  eamilPasswordSignIn(
    @Args("input") input: EmailPasswordSignInInput
  ): Promise<EmailPasswordSignInResult> {
    return this.authService.eamilPasswordSignIn(input);
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
}
