import React, { ReactElement } from "react";
import { accountSettingsMenu } from "../../../data/account-settings-menu";
import { userDashboardMenu } from "../../../data/user-dashboard-menu";
import AppLayout from "../../../layouts/app-layout";
import DashboardLayout from "../../../layouts/dashbaord-layout";
import SettingsLayout from "../../../layouts/settings-layout";
import { CustomNextPage } from "../../../types";

const OverviewPage: CustomNextPage = () => {
  return (
    <div className="space-y-4">
      <div className="w-full h-96 bg-red-500"></div>
      <div className="w-full h-96 bg-red-500"></div>
      <div className="w-full h-96 bg-red-500"></div>
      <div className="w-full h-96 bg-red-500"></div>
      <div className="w-full h-96 bg-red-500"></div>
    </div>
  );
};

export default OverviewPage;

OverviewPage.getLayout = (page: ReactElement) => {
  return (
    <AppLayout>
      <DashboardLayout menu={userDashboardMenu} active="settings">
        <SettingsLayout
          backLabel="Settings"
          backLink="/dashboard/settings"
          menu={accountSettingsMenu}
          active="overview"
        >
          {page}
        </SettingsLayout>
      </DashboardLayout>
    </AppLayout>
  );
};
