import React, { ReactNode } from "react";
import AppFooter from "components/app-footer";
import AppHeader from "components/app-header";

export type AppLayoutProps = {
  children: ReactNode;
  stickyHeader?: boolean;
  paths?: string[];
};

const AppLayout = ({ children, stickyHeader, paths }: AppLayoutProps) => {
  return (
    <>
      <AppHeader paths={paths} sticky={stickyHeader} />
      <main className="min-h-screen">{children}</main>
      <AppFooter />
    </>
  );
};

export default AppLayout;
