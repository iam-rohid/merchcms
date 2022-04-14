import React, { ReactElement } from "react";
import AppLayout from "../../../layouts/app-layout";
import DashboardLayout from "../../../layouts/dashbaord-layout";
import SettingsLayout from "../../../layouts/settings-layout";
import { CustomNextPage } from "../../../types";

const BillingPage: CustomNextPage = () => {
  return <div>BillingPage</div>;
};

export default BillingPage;

BillingPage.getLayout = (page: ReactElement) => {
  return (
    <AppLayout>
      <DashboardLayout active="settings">
        <SettingsLayout active="billing">{page}</SettingsLayout>
      </DashboardLayout>
    </AppLayout>
  );
};
