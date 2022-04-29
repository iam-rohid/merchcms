import { CustomNextPage } from "src/types";
import AppDashboardLayout from "components/layouts/common-layouts/app-dashboard-layout";
import SEO from "components/SEO";

const ActivityPage: CustomNextPage = () => {
  return <p>ActivityPage</p>;
};

export default ActivityPage;

ActivityPage.getLayout = (page) => (
  <>
    <SEO title="Activity" />
    <AppDashboardLayout children={page} id="activity" />
  </>
);
