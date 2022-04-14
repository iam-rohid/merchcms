import { storeSettingsMenu, storeSettingsPath } from "data/store-settings-menu";
import SettingsLayout from "layouts/settings-layout";
import React from "react";
import { ReactNode } from "react";
import StoreDashboardLayout from "./store-dashboard-layout";

const StoreSettingsLayout = ({
  id,
  children,
  showBackLink = true,
}: {
  id: string;
  children: ReactNode;
  showBackLink?: boolean;
}) => {
  return (
    <StoreDashboardLayout id="settings">
      <SettingsLayout
        backLabel="Settings"
        backLink={showBackLink ? storeSettingsPath : undefined}
        menu={storeSettingsMenu}
        active={id}
      >
        {children}
      </SettingsLayout>
    </StoreDashboardLayout>
  );
};

export default StoreSettingsLayout;
