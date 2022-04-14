import StoreDashboardLayout from "layouts/common-layouts/store-dashboard-layout";
import { CustomNextPage } from "types/next.type";

const StoreOverviewPage: CustomNextPage = () => {
  return <div>StoreOverviewPage</div>;
};

export default StoreOverviewPage;

StoreOverviewPage.getLayout = (page) => (
  <StoreDashboardLayout children={page} id="overview" />
);
