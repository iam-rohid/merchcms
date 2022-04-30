import AppFooter from "components/app-footer";
import Container from "components/container";
import React, { ReactNode } from "react";

export type SignUpLayoutProps = {
  children: ReactNode;
};

const SignUpLayout = ({ children }: SignUpLayoutProps) => {
  return (
    <>
      <main className="bg-white dark:bg-gray-900 relative">
        <Container
          maxWidth="6xl"
          className="grid lg:grid-cols-2 px-0 min-h-screen"
        >
          <div className="relative col-start-1 z-20 p-8">
            <div className="bg-gray-50 dark:bg-black absolute right-0 w-screen top-0 bottom-0 -z-[1]"></div>
          </div>
          <div className="row-start-1 lg:row-start-auto p-8">
            <Container maxWidth="xl" className="px-0">
              {children}
            </Container>
          </div>
        </Container>
      </main>
    </>
  );
};

export default SignUpLayout;
