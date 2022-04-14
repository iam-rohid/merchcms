import { ReactNode } from "react";
import NavigationRow, { NavigationRowProps } from "components/navigation-row";
import { Menu } from "types";

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
      <NavigationRow sticky={stickyNav} menu={menu} active={active} />
      {children}
    </>
  );
};

export default DashboardLayout;
