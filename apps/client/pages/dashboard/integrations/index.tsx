import React, { ReactElement } from "react";
import AppLayout from "../../../layouts/app-layout";
import DashboardLayout from "../../../layouts/dashbaord-layout";
import { CustomNextPage } from "../../../types";

const IntegrationsPage: CustomNextPage = () => {
  return <>IntegrationsPage</>;
};

export default IntegrationsPage;

IntegrationsPage.getLayout = (page: ReactElement) => {
  return (
    <AppLayout>
      <DashboardLayout active="integrations">{page}</DashboardLayout>
    </AppLayout>
  );
};
