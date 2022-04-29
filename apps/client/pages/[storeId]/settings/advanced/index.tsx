import SEO from "components/SEO";
import StoreSettingsLayout from "components/layouts/common-layouts/store-settings-layout";
import { CustomNextPage } from "src/types/next.type";

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
