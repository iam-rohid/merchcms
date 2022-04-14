import { appSettingsMenu, appSettingsPath } from "data/app-settings-menu";
import SettingsLayout from "layouts/settings-layout";
import React, { ReactNode } from "react";
import AppDashboardLayout from "./app-dashboard-layout";

const AppSettingsLayout = ({
  id,
  children,
  showBackLink = true,
}: {
  id: string;
  children: ReactNode;
  showBackLink?: boolean;
}) => {
  return (
    <AppDashboardLayout id="settings">
      <SettingsLayout
        backLabel="Settings"
        backLink={showBackLink ? appSettingsPath : undefined}
        menu={appSettingsMenu}
        active={id}
      >
        {children}
      </SettingsLayout>
    </AppDashboardLayout>
  );
};

export default AppSettingsLayout;
