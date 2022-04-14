import React, { ReactElement } from "react";
import AppLayout from "../../../layouts/app-layout";
import DashboardLayout from "../../../layouts/dashbaord-layout";
import SettingsLayout from "../../../layouts/settings-layout";
import { CustomNextPage } from "../../../types";

const OverviewPage: CustomNextPage = () => {
  return <div>OverviewPage</div>;
};

export default OverviewPage;

OverviewPage.getLayout = (page: ReactElement) => {
  return (
    <AppLayout>
      <DashboardLayout active="settings">
        <SettingsLayout active="overview">{page}</SettingsLayout>
      </DashboardLayout>
    </AppLayout>
  );
};
