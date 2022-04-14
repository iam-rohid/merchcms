import React, { ReactElement } from "react";
import { accountSettingsMenu } from "../../../data/account-settings-menu";
import { userDashboardMenu } from "../../../data/user-dashboard-menu";
import AppLayout from "../../../layouts/app-layout";
import DashboardLayout from "../../../layouts/dashbaord-layout";
import SettingsLayout from "../../../layouts/settings-layout";
import { CustomNextPage } from "../../../types";

const AccountPage: CustomNextPage = () => {
  return <div>AccountPage</div>;
};

export default AccountPage;

AccountPage.getLayout = (page: ReactElement) => {
  return (
    <AppLayout>
      <DashboardLayout menu={userDashboardMenu} active="settings">
        <SettingsLayout
          backLabel="Settings"
          backLink="/dashboard/settings"
          menu={accountSettingsMenu}
          active="account"
        >
          {page}
        </SettingsLayout>
      </DashboardLayout>
    </AppLayout>
  );
};
