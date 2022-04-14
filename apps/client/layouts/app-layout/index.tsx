import React, { ReactNode } from "react";
import AppFooter from "../../components/app-footer";
import AppHeader from "../../components/app-header";

export type AppLayoutProps = {
  children: ReactNode;
  stickyHeader?: boolean;
};

const AppLayout = ({ children, stickyHeader }: AppLayoutProps) => {
  return (
    <>
      <AppHeader sticky={stickyHeader} />
      <main className="min-h-screen">{children}</main>
      <AppFooter />
    </>
  );
};

export default AppLayout;
