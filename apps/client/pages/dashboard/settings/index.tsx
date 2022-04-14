import React, { ReactElement } from "react";
import AppLayout from "../../../layouts/app-layout";
import DashboardLayout from "../../../layouts/dashbaord-layout";
import SettingsLayout from "../../../layouts/settings-layout";
import { CustomNextPage } from "../../../types";
import OverviewPage from "./overview";

const SettingsPage: CustomNextPage = () => {
  return <OverviewPage />;
};

export default SettingsPage;

SettingsPage.getLayout = (page: ReactElement) => {
  return (
    <AppLayout>
      <DashboardLayout active="settings">
        <SettingsLayout active="overview">{page}</SettingsLayout>
      </DashboardLayout>
    </AppLayout>
  );
};
