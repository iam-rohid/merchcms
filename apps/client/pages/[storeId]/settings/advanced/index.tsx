import SEO from "components/SEO";
import StoreSettingsLayout from "layouts/common-layouts/store-settings-layout";
import { CustomNextPage } from "types/next.type";

const AdvancedPage: CustomNextPage = () => {
  return <div>AdvancedPage</div>;
};

export default AdvancedPage;

AdvancedPage.getLayout = (page) => (
  <>
    <SEO title="Store Advanced Settings" />
    <StoreSettingsLayout children={page} id="advanced" />
  </>
);
