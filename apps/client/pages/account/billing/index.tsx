import React, { ReactElement } from "react";
import { userDashboardMenu } from "data/user-dashboard-menu";
import { CustomNextPage } from "types";
import DashboardLayout from "layouts/dashbaord-layout";
import SettingsLayout from "layouts/settings-layout";
import AppLayout from "layouts/app-layout";
import { accountSettingsMenu } from "data/account-settings-menu";

const BillingPage: CustomNextPage = () => {
  return <div>BillingPage</div>;
};

export default BillingPage;

BillingPage.getLayout = (page: ReactElement) => {
  return (
    <AppLayout>
      <DashboardLayout menu={userDashboardMenu} active="settings">
        <SettingsLayout
          backLabel="Settings"
          backLink="/account"
          menu={accountSettingsMenu}
          active="billing"
        >
          {page}
        </SettingsLayout>
      </DashboardLayout>
    </AppLayout>
  );
};
