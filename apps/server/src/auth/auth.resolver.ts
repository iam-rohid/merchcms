import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import {
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
}
