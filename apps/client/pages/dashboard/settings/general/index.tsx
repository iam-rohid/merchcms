import { CustomNextPage } from "types";
import AppSettingsLayout from "layouts/common-layouts/app-settings-layout";

const GeneralPage: CustomNextPage = () => {
  return (
    <div className="space-y-8">
      <div className="w-full h-64 bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700"></div>
      <div className="w-full h-64 bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700"></div>
      <div className="w-full h-64 bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700"></div>
      <div className="w-full h-64 bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700"></div>
      <div className="w-full h-64 bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700"></div>
    </div>
  );
};

export default GeneralPage;

GeneralPage.getLayout = (page) => (
  <AppSettingsLayout children={page} id="general" />
);
