import SEO from "components/SEO";
import StoreSettingsLayout from "components/layouts/common-layouts/store-settings-layout";
import { CustomNextPage } from "src/types/next.type";

const GeneralPage: CustomNextPage = () => {
  return <div>GeneralPage</div>;
};

export default GeneralPage;

GeneralPage.getLayout = (page) => (
  <>
    <SEO title="Store General Settings" />
    <StoreSettingsLayout children={page} id="general" />
  </>
);
