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
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";

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
      <Box
        pl={[0, 0, 320 + 32, 480 + 32, 640 + 32]}
        transition={"padding-left"}
        transitionDuration="0.3s"
      >
        <Box
          width={[0, 0, 320, 480, 640]}
          position="fixed"
          left={[0, 0, 0, 8]}
          top={[0, 0, 0, 8]}
          bottom={[0, 0, 0, 8]}
          borderRadius={[0, 0, 0, "xl", "2xl"]}
          overflow="hidden"
          transition={"width"}
          transitionDuration="0.3s"
        >
          <Image
            src={
              "https://images.unsplash.com/photo-1619727574607-f43bb24f1c6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            }
            layout="fill"
            objectFit="cover"
          />
        </Box>
        <Flex
          as="header"
          width="full"
          justifyContent="flex-end"
          alignItems="center"
          height={14}
          px={4}
        >
          <Text>
            Already have an account?{" "}
            <Link href="/login" passHref>
              <Button as="a" variant="link" colorScheme="blue">
                Log In
              </Button>
            </Link>
          </Text>
        </Flex>

        <Container maxWidth="xl" my={8}>
          <Heading as="h1" size="lg" mb={8}>
            Sign Up to MerchCMS
          </Heading>

          <Flex direction={"column"} gap={4}>
            <Button
              variant="outline"
              isFullWidth
              colorScheme="red"
              leftIcon={<Google />}
            >
              Continue with Google
            </Button>

            <Button
              variant="outline"
              isFullWidth
              colorScheme="blue"
              leftIcon={<Facebook />}
            >
              Continue with Facebook
            </Button>
          </Flex>

          <Flex direction="row" gap={4} my={8} alignItems="center">
            <Divider flex={1} />
            <Text color="GrayText">Or Sign Up with your Email</Text>
            <Divider flex={1} />
          </Flex>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.username} mb={4}>
              <FormLabel htmlFor="username-input-field">Username</FormLabel>
              <Input
                type="text"
                id="username-input-field"
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
                <FormErrorMessage>{errors.username.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.email} mb={4}>
              <FormLabel htmlFor="email-input-field">Email</FormLabel>
              <Input
                type="email"
                id="email-input-field"
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
                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.password} mb={4}>
              <FormLabel htmlFor="password-input-field">Password</FormLabel>
              <Input
                type="password"
                id="password-input-field"
                placeholder="johndoe@example.com"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                })}
              />
              {errors.password && (
                <FormErrorMessage>{errors.password.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.agree} mb={8}>
              <Checkbox
                type="checkbox"
                id="agreement-checkbox"
                {...register("agree", {
                  required: {
                    value: true,
                    message: "You must agree to the terms and conditions",
                  },
                })}
              >
                Yes, I understand and agree to the{" "}
                <Link href="/" passHref>
                  <Button as="a" variant="link" colorScheme="blue">
                    Terms of Service
                  </Button>
                </Link>
                , including the{" "}
                <Link href="/" passHref>
                  <Button as="a" variant="link" colorScheme="blue">
                    User Agreement
                  </Button>
                </Link>{" "}
                and{" "}
                <Link href="/" passHref>
                  <Button as="a" variant="link" colorScheme="blue">
                    Privacy Policy
                  </Button>
                </Link>
              </Checkbox>
              {errors.agree && (
                <FormErrorMessage>{errors.agree.message}</FormErrorMessage>
              )}
            </FormControl>

            <Button
              type="submit"
              variant="solid"
              colorScheme="blue"
              isFullWidth
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            >
              Sign Up
            </Button>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default SignUpPage;
