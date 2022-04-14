import StoreDashboardLayout from "layouts/common-layouts/store-dashboard-layout";
import { CustomNextPage } from "types/next.type";

const AnalyticsPage: CustomNextPage = () => {
  return <div>AnalyticsPage</div>;
};

export default AnalyticsPage;

AnalyticsPage.getLayout = (page) => (
  <StoreDashboardLayout children={page} id="analytics" />
);
