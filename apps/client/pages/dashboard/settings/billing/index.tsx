import { CustomNextPage } from "types";
import AppSettingsLayout from "layouts/common-layouts/app-settings-layout";

const BillingPage: CustomNextPage = () => {
  return <div>BillingPage</div>;
};

export default BillingPage;

BillingPage.getLayout = (page) => (
  <AppSettingsLayout children={page} id="billing" />
);
