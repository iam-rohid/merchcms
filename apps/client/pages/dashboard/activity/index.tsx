import { CustomNextPage } from "types";
import AppDashboardLayout from "layouts/common-layouts/app-dashboard-layout";

const ActivityPage: CustomNextPage = () => {
  return <p>ActivityPage</p>;
};

export default ActivityPage;

ActivityPage.getLayout = (page) => (
  <AppDashboardLayout children={page} id="activity" />
);
