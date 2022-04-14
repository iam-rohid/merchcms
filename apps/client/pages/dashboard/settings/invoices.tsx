import React, { ReactElement } from "react";
import { accountSettingsMenu } from "../../../data/account-settings-menu";
import { userDashboardMenu } from "../../../data/user-dashboard-menu";
import AppLayout from "../../../layouts/app-layout";
import DashboardLayout from "../../../layouts/dashbaord-layout";
import SettingsLayout from "../../../layouts/settings-layout";

const InvoicesPage = () => {
  return <div>InvoicesPage</div>;
};

export default InvoicesPage;

InvoicesPage.getLayout = (page: ReactElement) => {
  return (
    <AppLayout>
      <DashboardLayout menu={userDashboardMenu} active="settings">
        <SettingsLayout
          backLabel="Settings"
          backLink="/dashboard/settings"
          menu={accountSettingsMenu}
          active="invoices"
        >
          {page}
        </SettingsLayout>
      </DashboardLayout>
    </AppLayout>
  );
};
