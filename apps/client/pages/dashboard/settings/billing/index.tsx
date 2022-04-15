import { CustomNextPage } from "types";
import AppSettingsLayout from "layouts/common-layouts/app-settings-layout";
import SEO from "components/SEO";

const BillingPage: CustomNextPage = () => {
  return <div>BillingPage</div>;
};

export default BillingPage;

BillingPage.getLayout = (page) => (
  <>
    <SEO title="Billing Settings" />
    <AppSettingsLayout children={page} id="billing" />
  </>
);
