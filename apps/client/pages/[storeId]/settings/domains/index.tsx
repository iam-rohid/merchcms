import SEO from "components/SEO";
import StoreSettingsLayout from "layouts/common-layouts/store-settings-layout";
import { CustomNextPage } from "types/next.type";

const DomainsPage: CustomNextPage = () => {
  return <div>DomainsPage</div>;
};

export default DomainsPage;

DomainsPage.getLayout = (page) => (
  <>
    <SEO title="Store Domains Settings" />
    <StoreSettingsLayout children={page} id="domains" />
  </>
);
