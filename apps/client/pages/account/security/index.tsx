import React, { ReactElement } from "react";
import { accountSettingsMenu } from "data/account-settings-menu";
import { userDashboardMenu } from "data/user-dashboard-menu";
import AppLayout from "layouts/app-layout";
import DashboardLayout from "layouts/dashbaord-layout";
import SettingsLayout from "layouts/settings-layout";
import { CustomNextPage } from "types";

const SecurityPage: CustomNextPage = () => {
  return <div>AccountPage</div>;
};

export default SecurityPage;

SecurityPage.getLayout = (page: ReactElement) => {
  return (
    <AppLayout>
      <DashboardLayout menu={userDashboardMenu} active="settings">
        <SettingsLayout
          backLabel="Settings"
          backLink="/account"
          menu={accountSettingsMenu}
          active="security"
        >
          {page}
        </SettingsLayout>
      </DashboardLayout>
    </AppLayout>
  );
};
