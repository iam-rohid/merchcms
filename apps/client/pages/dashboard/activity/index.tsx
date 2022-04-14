import React, { ReactElement } from "react";
import AppLayout from "../../../layouts/app-layout";
import DashboardLayout from "../../../layouts/dashbaord-layout";
import { CustomNextPage } from "../../../types";

const ActivityPage: CustomNextPage = () => {
  return <p>ActivityPage</p>;
};

export default ActivityPage;

ActivityPage.getLayout = (page: ReactElement) => {
  return (
    <AppLayout>
      <DashboardLayout active="activity">{page}</DashboardLayout>
    </AppLayout>
  );
};
