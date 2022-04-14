import React, { ReactElement } from "react";
import { accountSettingsMenu } from "../../../data/account-settings-menu";
import AppLayout from "../../../layouts/app-layout";
import DashboardLayout from "../../../layouts/dashbaord-layout";
import SettingsLayout from "../../../layouts/settings-layout";
import { CustomNextPage } from "../../../types";

const NotificationsPage: CustomNextPage = () => {
  return <div>NotificationsPage</div>;
};

export default NotificationsPage;

NotificationsPage.getLayout = (page: ReactElement) => {
  return (
    <AppLayout>
      <DashboardLayout active="settings">
        <SettingsLayout
          backLabel="Settings"
          backLink="/dashboard/settings"
          menu={accountSettingsMenu}
          active="notifications"
        >
          {page}
        </SettingsLayout>
      </DashboardLayout>
    </AppLayout>
  );
};
