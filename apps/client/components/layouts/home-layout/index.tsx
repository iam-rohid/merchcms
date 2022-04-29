import AppFooter from "components/app-footer";
import HomeHeader from "components/home-header";
import { ReactNode } from "react";

export type HomeLayoutProps = {
  children: ReactNode;
  stickyHeader?: boolean;
};

const HomeLayout = ({ children, stickyHeader = true }: HomeLayoutProps) => {
  return (
    <>
      <HomeHeader stikyHeader={stickyHeader} />
      <main className="min-h-[calc(100vh-3.5rem)] bg-gray-50 dark:bg-gray-900 relative">
        {children}
      </main>
      <AppFooter />
    </>
  );
};

export default HomeLayout;
