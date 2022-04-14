import React, { ReactNode } from "react";
import AppFooter from "../../components/app-footer";
import AppHeader from "../../components/app-header";

const AppLayout = ({
  children,
  stickyHeader = false,
}: {
  children: ReactNode;
  stickyHeader?: boolean;
}) => {
  return (
    <>
      <AppHeader sticky={stickyHeader} />
      <main className="min-h-screen">{children}</main>
      <AppFooter />
    </>
  );
};

export default AppLayout;
