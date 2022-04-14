import { userDashboardMenu } from "data/app-dashboard-menu";
import AppLayout from "layouts/app-layout";
import DashboardLayout from "layouts/dashbaord-layout";
import React, { ReactNode } from "react";

const AppDashboardLayout = ({
  id,
  children,
}: {
  children: ReactNode;
  id: string;
}) => {
  return (
    <AppLayout>
      <DashboardLayout menu={userDashboardMenu} active={id}>
        {children}
      </DashboardLayout>
    </AppLayout>
  );
};

export default AppDashboardLayout;
