import { CustomNextPage } from "src/types";
import AppSettingsLayout from "components/layouts/common-layouts/app-settings-layout";
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
