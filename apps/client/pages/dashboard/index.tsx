import { ReactElement } from "react";
import { userDashboardMenu } from "../../data/user-dashboard-menu";
import AppLayout from "../../layouts/app-layout";
import DashboardLayout from "../../layouts/dashbaord-layout";
import { CustomNextPage, Store } from "../../types";
import OverviewPage from "./overview";

const stores: Store[] = [
  {
    id: "store-1",
    name: "Store 1",
    description: "This is my store description",
  },
  {
    id: "store-2",
    name: "Store 2",
    description: "This is my store description",
  },
  {
    id: "store-3",
    name: "Store 3",
    description: "This is my store description",
  },
  {
    id: "store-4",
    name: "Store 4",
    description: "This is my store description",
  },
  {
    id: "store-5",
    name: "Store 5",
    description: "This is my store description",
  },
];

const DashbaordPage: CustomNextPage = () => {
  return <OverviewPage />;
};

export default DashbaordPage;

DashbaordPage.getLayout = (page: ReactElement) => {
  return (
    <AppLayout>
      <DashboardLayout menu={userDashboardMenu} active="overview">
        {page}
      </DashboardLayout>
    </AppLayout>
  );
};
