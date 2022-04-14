import React, { ReactElement } from "react";
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
      <DashboardLayout active="settings">
        <SettingsLayout active="account">{page}</SettingsLayout>
      </DashboardLayout>
    </AppLayout>
  );
};
