import Button from "components/button";
import InputField from "components/input-field";
import SignUpLayout from "components/layouts/signup-layout";
import SEO from "components/SEO";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useCheckUserExistsWithEmailLazyQuery,
  useCheckUserExistsWithUsernameLazyQuery,
  useSignUpWithEmailPasswordMutation,
} from "src/generated/graphql";
import { CustomNextPage } from "src/types";

type FormFields = {
  username: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
};

const EmailSignUpPage: CustomNextPage = () => {
  const {
    handleSubmit,
    register,
    setError,
    setValue,
    getValues,
    setFocus,
    clearErrors,
    formState: { errors },
  } = useForm<FormFields>();
  const [otherError, setOtehrError] = useState("");
  const router = useRouter();

  const [checkUserExistsWithUsernameLazyQuery, { loading: verifyingUsername }] =
    useCheckUserExistsWithUsernameLazyQuery({
      fetchPolicy: "no-cache",
    });
  const [checkUserExistsWithEmailLazyQuery, { loading: verifyingEmail }] =
    useCheckUserExistsWithEmailLazyQuery({
      fetchPolicy: "no-cache",
    });
  const [signUpWithEmailPasswordMutation, { loading: signingUp }] =
    useSignUpWithEmailPasswordMutation();

  const onSubmit = useCallback(
    async ({ email, newPassword, confirmPassword, username }: FormFields) => {
      setOtehrError("");
      await signUpWithEmailPasswordMutation({
        variables: {
          input: {
            email,
            password: newPassword,
            username,
          },
        },
        onCompleted: ({ emailPasswordSignUp }) => {
          if (emailPasswordSignUp.__typename === "EmailPasswordSignUpFailure") {
            const { emailError, passwordError, usernameError, otherError } =
              emailPasswordSignUp;
            if (emailError) {
              setError("email", {
                message: emailError,
              });
            }
            if (passwordError) {
              setError("newPassword", {
                message: passwordError,
              });
            }
            if (usernameError) {
              setError("username", {
                message: usernameError,
              });
            }
            if (otherError) {
              setOtehrError(otherError);
            }
          }
        },
      });
    },
    [setError, setOtehrError]
  );

  const veirfyUsername = useCallback(
    async (username: string) => {
      const { data } = await checkUserExistsWithUsernameLazyQuery({
        variables: { username },
      });
      if (data?.findUser.__typename === "FindUserSuccess") {
        setError("username", {
          message: "Username is already taken",
        });
      } else {
        clearErrors("username");
      }
    },
    [checkUserExistsWithUsernameLazyQuery, clearErrors]
  );

  const veirfyEmail = useCallback(
    async (email: string) => {
      const { data } = await checkUserExistsWithEmailLazyQuery({
        variables: { email },
      });
      if (data?.findUser.__typename === "FindUserSuccess") {
        setError("email", {
          message: "Email already exists",
        });
      } else {
        clearErrors("email");
      }
    },
    [checkUserExistsWithEmailLazyQuery, clearErrors]
  );

  useEffect(() => {
    if (typeof router.query.email === "string" && !getValues("email")) {
      setValue("email", router.query.email);
      veirfyEmail(router.query.email);
    }
    setFocus("username");
  }, [router, getValues, veirfyEmail]);

  return (
    <>
      <SEO title="Email Sign Up" />
      <div className="w-full space-y-8">
        <h1 className="text-center text-3xl font-bold">Sing Up With Email</h1>
        <div className="space-y-4">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <InputField
              label={"Username"}
              error={errors.username?.message}
              type="text"
              autoComplete="username"
              placeholder="Username"
              {...register("username", {
                required: {
                  value: true,
                  message: "Username is required",
                },
                onBlur: (e) => {
                  if (e.target.value) {
                    veirfyUsername(e.target.value);
                  }
                },
              })}
            />
            <InputField
              label={"Email"}
              error={errors.email?.message}
              type="email"
              autoComplete="email"
              placeholder="johndoe@example.com"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                onBlur: (e) => {
                  if (e.target.value) {
                    veirfyEmail(e.target.value);
                  }
                },
              })}
            />
            <InputField
              label="Password"
              error={errors.newPassword?.message}
              type="password"
              autoComplete="new-passowrd"
              placeholder="********"
              {...register("newPassword", {
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
            />
            <InputField
              label={"Confirm Password"}
              error={errors.confirmPassword?.message}
              type="password"
              placeholder="********"
              autoComplete="new-passowrd"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Password confirmation is required",
                },
                validate: (value) =>
                  value !== getValues("newPassword")
                    ? "Password didn't match"
                    : undefined,
              })}
            />
            <p className="text-red-500">{otherError}</p>
            <Button className="w-full" disabled={signingUp}>
              Continue with Email
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmailSignUpPage;

EmailSignUpPage.getLayout = (page) => <SignUpLayout>{page}</SignUpLayout>;
