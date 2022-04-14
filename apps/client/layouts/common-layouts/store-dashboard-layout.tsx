import { storeDashboardMenu } from "data/store-dashboard-menu";
import AppLayout from "layouts/app-layout";
import DashboardLayout from "layouts/dashbaord-layout";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";

const StoreDashboardLayout = ({
  id,
  children,
}: {
  children: ReactNode;
  id: string;
}) => {
  const { query } = useRouter();
  return (
    <AppLayout paths={[query.storeId as string]}>
      <DashboardLayout menu={storeDashboardMenu} active={id}>
        {children}
      </DashboardLayout>
    </AppLayout>
  );
};

export default StoreDashboardLayout;
