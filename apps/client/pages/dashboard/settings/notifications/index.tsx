import { CustomNextPage } from "src/types";
import AppSettingsLayout from "components/layouts/common-layouts/app-settings-layout";
import SEO from "components/SEO";

const NotificationsPage: CustomNextPage = () => {
  return <div>NotificationsPage</div>;
};

export default NotificationsPage;

NotificationsPage.getLayout = (page) => (
  <>
    <SEO title="Notification Settings" />
    <AppSettingsLayout children={page} id="notifications" />
  </>
);
