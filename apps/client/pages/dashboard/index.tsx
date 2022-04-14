import { FC, ReactElement } from "react";
import Container from "../../components/container";
import AppLayout from "../../layouts/app-layout";
import DashboardLayout from "../../layouts/dashbaord-layout";
import { NextPageWithLayout } from "../_app";

const OverviewPage: NextPageWithLayout = () => {
  return (
    <Container className="space-y-8 my-8">
      <div className="flex gap-4 h-12">
        <div className="relative flex-1 h-full">
          <input
            type="text"
            className="w-full h-full px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            placeholder="Search..."
          />
        </div>
        <button className="h-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 border border-gray-200 dark:border-gray-700 px-6">
          New Store
        </button>
      </div>
    </Container>
  );
};

export default OverviewPage;

OverviewPage.getLayout = (page: ReactElement) => {
  return (
    <AppLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </AppLayout>
  );
};
