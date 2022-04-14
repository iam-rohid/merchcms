import React, { ReactElement } from "react";
import DashboardLayout from "../../../layouts/dashbaord-layout";

const ActivityPage = () => {
  return <p>ActivityPage</p>;
};

export default ActivityPage;

ActivityPage.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
