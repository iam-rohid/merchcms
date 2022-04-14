import React, { ReactElement } from "react";
import AppLayout from "../../../layouts/app-layout";
import DashboardLayout from "../../../layouts/dashbaord-layout";

const SettingsPage = () => {
  return <h1>Index</h1>;
};

export default SettingsPage;

SettingsPage.getLayout = (page: ReactElement) => {
  return (
    <AppLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </AppLayout>
  );
};
