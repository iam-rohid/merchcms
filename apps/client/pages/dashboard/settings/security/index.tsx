import { CustomNextPage } from "src/types";
import AppSettingsLayout from "components/layouts/common-layouts/app-settings-layout";
import SEO from "components/SEO";

const SecurityPage: CustomNextPage = () => {
  return <div>AccountPage</div>;
};

export default SecurityPage;

SecurityPage.getLayout = (page) => (
  <>
    <SEO title="Security Settings" />
    <AppSettingsLayout children={page} id="security" />
  </>
);
