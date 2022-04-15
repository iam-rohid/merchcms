import SEO from "components/SEO";
import StoreDashboardLayout from "layouts/common-layouts/store-dashboard-layout";
import { CustomNextPage } from "types/next.type";

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
