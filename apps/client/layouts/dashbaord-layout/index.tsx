import { useRouter } from "next/router";
import NavigationRow from "../../components/navigation-row";
import { Menu } from "../../types";

const menu: Menu = [
  {
    label: "Overview",
    href: "/dashboard",
  },
  {
    label: "Integrations",
    href: "/dashboard/integrations",
  },
  {
    label: "Activity",
    href: "/dashboard/activity",
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
  },
];

const DashboardLayout = ({
  children,
  stickyNav = true,
}: {
  children: JSX.Element;
  stickyNav?: boolean;
}) => {
  const { asPath } = useRouter();

  return (
    <>
      <NavigationRow sticky={stickyNav} menu={menu} active={asPath} />
      {children}
    </>
  );
};

export default DashboardLayout;
