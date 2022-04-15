import { CustomNextPage } from "types";
import AppSettingsLayout from "layouts/common-layouts/app-settings-layout";
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
