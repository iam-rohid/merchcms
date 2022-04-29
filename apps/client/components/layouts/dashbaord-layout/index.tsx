import { ReactNode } from "react";
import NavigationRow from "components/navigation-row";
import { Menu } from "src/types";

export type DashboardLayoutProps = {
  children: ReactNode;
  stickyNav?: boolean;
  active: string;
  menu: Menu;
};

const DashboardLayout = ({
  children,
  stickyNav = true,
  active,
  menu,
}: DashboardLayoutProps) => {
  return (
    <>
      <NavigationRow
        sticky={stickyNav}
        menu={menu}
        active={active}
        className="-mt-3"
      />
      <main className="min-h-[calc(100vh-3.5rem-3rem+0.75rem)]">
        {children}
      </main>
    </>
  );
};

export default DashboardLayout;
