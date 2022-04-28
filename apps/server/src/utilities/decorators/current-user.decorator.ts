import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { User } from "src/user/models";

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User | undefined => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  }
);
