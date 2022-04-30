import SEO from "components/SEO";
import { CustomNextPage } from "src/types/next.type";
import {
  useCheckUserExistsWithEmailLazyQuery,
  useCheckUserExistsWithUsernameLazyQuery,
  useSignUpWithEmailPasswordMutation,
} from "src/generated/graphql";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { Google, Facebook } from "@mui/icons-material";
import classNames from "classnames";

type FormFields = {
  username: string;
  email: string;
  password: string;
  agree: boolean;
};

const SignUpPage: CustomNextPage = () => {
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
  const [checkUserExistsWithUsernameLazyQuery, { loading: verifyingUsername }] =
    useCheckUserExistsWithUsernameLazyQuery({
      fetchPolicy: "no-cache",
    });
  const [checkUserExistsWithEmailLazyQuery, { loading: verifyingEmail }] =
    useCheckUserExistsWithEmailLazyQuery({
      fetchPolicy: "no-cache",
    });
  const [signUpWithEmailPasswordMutation, { loading: isSubmitting }] =
    useSignUpWithEmailPasswordMutation();

  const onSubmit = useCallback(
    async ({ email, password, username }: FormFields) => {
      await signUpWithEmailPasswordMutation({
        variables: {
          input: {
            email,
            password,
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
              setError("password", {
                message: passwordError,
              });
            }
            if (usernameError) {
              setError("username", {
                message: usernameError,
              });
            }
            if (otherError) {
              console.log(otherError);
            }
          }
        },
      });
    },
    [setError]
  );

  const veirfyUsername = useCallback(
    async (username: string) => {
      const { data } = await checkUserExistsWithUsernameLazyQuery({
        variables: { username },
      });
      if (data?.findUser.__typename === "FindUserSuccess") {
        setError("username", {
          message: "Username already taken. Please choose another one",
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
          message: "An account already exists with this email",
        });
      } else {
        clearErrors("email");
      }
    },
    [checkUserExistsWithEmailLazyQuery, clearErrors]
  );

  return (
    <>
      <SEO title="Sign Up" />
      <div className="signup-page">
        <div className="cover-image-wrapper">
          <Image
            src={
              "https://images.unsplash.com/photo-1619727574607-f43bb24f1c6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            }
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="container signup-page-header">
          <p>
            Already have an account?{" "}
            <Link href="/login" passHref>
              <a className="link primary">Log In</a>
            </Link>
          </p>
        </div>
        <div className="container sm">
          <h1 className="heading-1">Sign Up to MerchCMS</h1>

          <div className="auth-providers">
            <button className="button solid full-width google">
              <span className="icon-left">
                <Google />
              </span>
              <p className="label">Continue with Google</p>
            </button>

            <button className="button solid full-width facebook">
              <span className="icon-left">
                <Facebook />
              </span>
              <p className="label">Continue with Facebook</p>
            </button>
          </div>

          <div className="separator">
            <hr className="separator-line" />
            <p className="separator-text">Or Sign Up with your Email</p>
            <hr className="separator-line" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              className={classNames("input-wrapper text-input", {
                error: !!errors.username,
              })}
            >
              <label htmlFor="username-input-field" className="input-label">
                Username
              </label>
              <input
                type="text"
                id="username-input-field"
                className="input-field"
                placeholder="johndoe123"
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
              {errors.username && (
                <p className="hint-text">{errors.username.message}</p>
              )}
            </div>

            <div
              className={classNames("input-wrapper text-input", {
                error: !!errors.email,
              })}
            >
              <label htmlFor="email-input-field" className="input-label">
                Email
              </label>
              <input
                type="text"
                id="email-input-field"
                className="input-field"
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
              {errors.email && (
                <p className="hint-text">{errors.email.message}</p>
              )}
            </div>

            <div
              className={classNames("input-wrapper text-input", {
                error: !!errors.password,
              })}
            >
              <label htmlFor="password-input-field" className="input-label">
                Password
              </label>
              <input
                type="text"
                id="password-input-field"
                className="input-field"
                placeholder="8-16 characters"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  maxLength: {
                    value: 16,
                    message: "Password must be at most 16 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="hint-text">{errors.password.message}</p>
              )}
            </div>

            <div
              className={classNames("input-wrapper checkbox-input", {
                error: errors.agree,
              })}
            >
              <label htmlFor="agreement-checkbox" className="input-label">
                <input
                  type="checkbox"
                  id="agreement-checkbox"
                  className="checkbox"
                  {...register("agree", {
                    required: {
                      value: true,
                      message: "You must agree to the terms and conditions",
                    },
                  })}
                />
                Yes, I understand and agree to the{" "}
                <Link href={"#"}>
                  <a className="link primary">Terms of Service</a>
                </Link>
                , including the{" "}
                <Link href={"#"}>
                  <a className="link primary">User Agreement</a>
                </Link>{" "}
                and{" "}
                <Link href={"#"}>
                  <a className="link primary">Privacy Policy</a>
                </Link>
              </label>
              {errors.agree && (
                <p className="hint-text">{errors.agree.message}</p>
              )}
            </div>

            <button className="button solid primary full-width" type="submit">
              <p className="label">
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </p>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
