import { CustomNextPage } from "types";
import AppSettingsLayout from "layouts/common-layouts/app-settings-layout";

const GeneralPage: CustomNextPage = () => {
  return (
    <div className="space-y-8">
      <div className="w-full h-64 bg-white border border-gray-200"></div>
      <div className="w-full h-64 bg-white border border-gray-200"></div>
      <div className="w-full h-64 bg-white border border-gray-200"></div>
      <div className="w-full h-64 bg-white border border-gray-200"></div>
      <div className="w-full h-64 bg-white border border-gray-200"></div>
    </div>
  );
};

export default GeneralPage;

GeneralPage.getLayout = (page) => (
  <AppSettingsLayout children={page} id="general" />
);
