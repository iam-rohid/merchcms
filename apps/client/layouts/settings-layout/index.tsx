import React, { ReactNode } from "react";
import Container from "../../components/container";
import NavigationColumn from "../../components/navigation-column";
import { Menu } from "../../types";

const menu: Menu = [
  {
    id: "overview",
    label: "Overview",
    href: "/dashboard/settings/overview",
  },
  {
    id: "account",
    label: "Account",
    href: "/dashboard/settings/account",
  },
  {
    id: "notifications",
    label: "Notifications",
    href: "/dashboard/settings/notifications",
  },
  {
    id: "billing",
    label: "Billing",
    href: "/dashboard/settings/billing",
  },
  {
    id: "invoices",
    label: "Invoices",
    href: "/dashboard/settings/invoices",
  },
];

export type SettingsLayoutProps = { children: ReactNode; active: string };

const SettingsLayout = ({ children, active }: SettingsLayoutProps) => {
  return (
    <>
      <Container>
        <div className="relative min-h-screen">
          <div className="absolute w-56 left-0 top-0 py-8 h-full border-r border-gray-200">
            <div className="bg-white absolute right-0 top-0 h-full w-screen -z-20" />
            <NavigationColumn menu={menu} active={active} />
          </div>
          <div className="ml-56 p-8">{children}</div>
        </div>
      </Container>
    </>
  );
};

export default SettingsLayout;
