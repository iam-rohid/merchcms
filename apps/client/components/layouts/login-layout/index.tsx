import HomeLayout from "components/layouts/home-layout";
import React, { ReactNode } from "react";

export type LoginLayoutProps = {
  children: ReactNode;
};

const LoginLayout = ({ children }: LoginLayoutProps) => {
  return <HomeLayout>{children}</HomeLayout>;
};

export default LoginLayout;
