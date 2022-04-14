import { CustomNextPage } from "types";
import AppSettingsLayout from "layouts/common-layouts/app-settings-layout";

const SecurityPage: CustomNextPage = () => {
  return <div>AccountPage</div>;
};

export default SecurityPage;

SecurityPage.getLayout = (page) => (
  <AppSettingsLayout children={page} id="security" />
);
