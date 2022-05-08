import React, { ReactNode } from "react";
import AppFooter from "components/app-footer";
import AppHeader from "components/app-header";
import { Box } from "@chakra-ui/react";

export type AppLayoutProps = {
  children: ReactNode;
  stickyHeader?: boolean;
  paths?: string[];
};

const AppLayout = ({ children, stickyHeader, paths }: AppLayoutProps) => {
  return (
    <>
      <AppHeader paths={paths} sticky={stickyHeader} />
      <Box minHeight="100vh">{children}</Box>
      <AppFooter />
    </>
  );
};

export default AppLayout;
