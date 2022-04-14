import { CustomNextPage } from "types";
import AppSettingsLayout from "layouts/common-layouts/app-settings-layout";

const NotificationsPage: CustomNextPage = () => {
  return <div>NotificationsPage</div>;
};

export default NotificationsPage;

NotificationsPage.getLayout = (page) => (
  <AppSettingsLayout children={page} id="notifications" />
);
