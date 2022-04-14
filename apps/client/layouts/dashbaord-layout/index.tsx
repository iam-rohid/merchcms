import { ReactNode } from "react";
import NavigationRow from "../../components/navigation-row";
import { Menu } from "../../types";

const menu: Menu = [
  {
    id: "overview",
    label: "Overview",
    href: "/dashboard/overview",
  },
  {
    id: "integrations",
    label: "Integrations",
    href: "/dashboard/integrations",
  },
  { id: "activity", label: "Activity", href: "/dashboard/activity" },
  { id: "settings", label: "Settings", href: "/dashboard/settings" },
];

const DashboardLayout = ({
  children,
  stickyNav = true,
  active,
}: {
  children: ReactNode;
  stickyNav?: boolean;
  active: string;
}) => {
  return (
    <>
      <NavigationRow sticky={stickyNav} menu={menu} active={active} />
      {children}
    </>
  );
};

export default DashboardLayout;
