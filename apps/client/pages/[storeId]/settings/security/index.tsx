import StoreSettingsLayout from "layouts/common-layouts/store-settings-layout";
import { CustomNextPage } from "types/next.type";

const SecurityPage: CustomNextPage = () => {
  return <div>SecurityPage</div>;
};

export default SecurityPage;

SecurityPage.getLayout = (page) => (
  <StoreSettingsLayout children={page} id="security" />
);
