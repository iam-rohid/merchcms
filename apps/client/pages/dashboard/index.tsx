import { CustomNextPage } from "types";
import OverviewPage from "./overview";
import AppDashboardLayout from "layouts/common-layouts/app-dashboard-layout";

const DashbaordPage: CustomNextPage = () => {
  return <OverviewPage />;
};

export default DashbaordPage;

DashbaordPage.getLayout = (page) => (
  <AppDashboardLayout children={page} id="overview" />
);
