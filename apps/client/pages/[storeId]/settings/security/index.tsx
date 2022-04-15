import SEO from "components/SEO";
import StoreSettingsLayout from "layouts/common-layouts/store-settings-layout";
import { CustomNextPage } from "types/next.type";

const SecurityPage: CustomNextPage = () => {
  return <div>SecurityPage</div>;
};

export default SecurityPage;

SecurityPage.getLayout = (page) => (
  <>
    <SEO title="Store Security Settings" />
    <StoreSettingsLayout children={page} id="security" />
  </>
);
