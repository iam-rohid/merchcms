import Button from "components/button";
import SEO from "components/SEO";
import SignUpLayout from "components/layouts/signup-layout";
import React from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { CustomNextPage } from "src/types/next.type";

const SignUpPage: CustomNextPage = () => {
  return (
    <>
      <SEO title="Sign Up" />

      <div className="w-full space-y-8">
        <h1 className="text-center text-3xl font-bold">Log in to MerchCMS</h1>
        <div className="space-y-4">
          <Button
            className="w-full"
            leftIcon={<FaGoogle />}
            iconsOnTheEdge
            truncate
            variant="outline"
          >
            Continue With Google
          </Button>
          <Button
            className="w-full"
            leftIcon={<FaFacebook />}
            iconsOnTheEdge
            truncate
            variant="outline"
          >
            Continue With Facebook
          </Button>
        </div>
        <p className="text-center text-gray-500 dark:text-gray-400">OR</p>
        <form className="space-y-4">
          <input
            type="email"
            autoComplete="email"
            placeholder="johndoe123@example.com"
            className="w-full h-10 bg-transparent border-gray-200 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-500 border outline-none px-4 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <Button className="w-full">Continue with Email</Button>
        </form>
      </div>
    </>
  );
};

SignUpPage.getLayout = (page) => <SignUpLayout>{page}</SignUpLayout>;

export default SignUpPage;
