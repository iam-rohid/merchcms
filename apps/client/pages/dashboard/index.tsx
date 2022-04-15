import { CustomNextPage } from "types";
import OverviewPage from "./overview";
import AppDashboardLayout from "layouts/common-layouts/app-dashboard-layout";
import SEO from "components/SEO";

const DashbaordPage: CustomNextPage = () => {
  return <OverviewPage />;
};

export default DashbaordPage;

DashbaordPage.getLayout = (page) => (
  <>
    <SEO title="Dashboard" />
    <AppDashboardLayout children={page} id="overview" />
  </>
);
