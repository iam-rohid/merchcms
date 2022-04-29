import SEO from "components/SEO";
import StoreDashboardLayout from "components/layouts/common-layouts/store-dashboard-layout";
import { CustomNextPage } from "src/types/next.type";

const AnalyticsPage: CustomNextPage = () => {
  return <div>AnalyticsPage</div>;
};

export default AnalyticsPage;

AnalyticsPage.getLayout = (page) => (
  <>
    <SEO title="Store Analytics" />
    <StoreDashboardLayout children={page} id="analytics" />
  </>
);
