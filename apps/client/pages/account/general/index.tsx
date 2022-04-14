import React, { ReactElement } from "react";
import { accountSettingsMenu } from "data/account-settings-menu";
import { userDashboardMenu } from "data/user-dashboard-menu";
import AppLayout from "layouts/app-layout";
import DashboardLayout from "layouts/dashbaord-layout";
import SettingsLayout from "layouts/settings-layout";
import { CustomNextPage } from "types";

const GeneralPage: CustomNextPage = () => {
  return (
    <div className="space-y-8">
      <div className="w-full h-64 bg-white border border-gray-200"></div>
      <div className="w-full h-64 bg-white border border-gray-200"></div>
      <div className="w-full h-64 bg-white border border-gray-200"></div>
      <div className="w-full h-64 bg-white border border-gray-200"></div>
      <div className="w-full h-64 bg-white border border-gray-200"></div>
    </div>
  );
};

export default GeneralPage;

GeneralPage.getLayout = (page: ReactElement) => {
  return (
    <AppLayout>
      <DashboardLayout menu={userDashboardMenu} active="settings">
        <SettingsLayout
          backLabel="Settings"
          backLink="/account"
          menu={accountSettingsMenu}
          active="general"
        >
          {page}
        </SettingsLayout>
      </DashboardLayout>
    </AppLayout>
  );
};
