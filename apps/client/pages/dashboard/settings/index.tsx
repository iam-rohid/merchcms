import React, { ReactElement } from "react";
import DashboardLayout from "../../../layouts/dashbaord-layout";

const SettingsPage = () => {
  return <h1>Index</h1>;
};

export default SettingsPage;

SettingsPage.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
