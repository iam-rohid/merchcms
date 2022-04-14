import React, { ReactElement } from "react";
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
      <DashboardLayout active="settings">
        <SettingsLayout active="invoices">{page}</SettingsLayout>
      </DashboardLayout>
    </AppLayout>
  );
};
