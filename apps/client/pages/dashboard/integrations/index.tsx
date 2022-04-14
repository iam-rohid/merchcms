import React, { ReactElement } from "react";
import AppLayout from "../../../layouts/app-layout";
import DashboardLayout from "../../../layouts/dashbaord-layout";

const IntegrationsPage = () => {
  return <>IntegrationsPage</>;
};

export default IntegrationsPage;

IntegrationsPage.getLayout = (page: ReactElement) => {
  return (
    <AppLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </AppLayout>
  );
};
