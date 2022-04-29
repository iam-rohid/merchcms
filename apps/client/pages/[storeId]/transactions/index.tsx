import SEO from "components/SEO";
import StoreDashboardLayout from "components/layouts/common-layouts/store-dashboard-layout";
import React, { ReactElement } from "react";

const TransactionsPage = () => {
  return <div>TransactionsPage</div>;
};

export default TransactionsPage;

TransactionsPage.getLayout = (page: ReactElement) => (
  <>
    <SEO title="Store Transactions" />
    <StoreDashboardLayout children={page} id="transactions" />
  </>
);
