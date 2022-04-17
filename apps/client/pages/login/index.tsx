import Button from "components/button";
import Container from "components/container";
import SEO from "components/SEO";
import LoginLayout from "layouts/login-layout";
import React from "react";
import { CustomNextPage } from "types/next.type";
import { FaGoogle, FaFacebook } from "react-icons/fa";

const LogInPage: CustomNextPage = () => {
  return (
    <>
      <Container maxWidth="md" className="py-16 h-full space-y-8">
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
            placeholder="johndoe123@example.com"
            className="w-full h-10 bg-transparent border-gray-200 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-500 border outline-none px-4 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <Button className="w-full">Continue with Email</Button>
        </form>
      </Container>
    </>
  );
};

export default LogInPage;

LogInPage.getLayout = (page) => (
  <>
    <SEO title="Log In" />
    <LoginLayout children={page} />
  </>
);
