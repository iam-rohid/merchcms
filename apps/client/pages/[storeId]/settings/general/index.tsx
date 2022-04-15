import StoreSettingsLayout from "layouts/common-layouts/store-settings-layout";
import { CustomNextPage } from "types/next.type";

const GeneralPage: CustomNextPage = () => {
  return <div>GeneralPage</div>;
};

export default GeneralPage;

GeneralPage.getLayout = (page) => (
  <StoreSettingsLayout children={page} id="general" />
);