import StoreDashboardLayout from "layouts/common-layouts/store-dashboard-layout";
import React, { ReactElement } from "react";

const TransactionsPage = () => {
  return <div>TransactionsPage</div>;
};

export default TransactionsPage;

TransactionsPage.getLayout = (page: ReactElement) => (
  <StoreDashboardLayout children={page} id="transactions" />
);
