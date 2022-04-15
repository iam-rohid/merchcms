import ProductDashboardLayout from "layouts/common-layouts/product-dashboard-layout";
import React from "react";
import { CustomNextPage } from "types/next.type";

const ProductOverviewPage: CustomNextPage = () => {
  return <div>ProductOverviewPage</div>;
};

export default ProductOverviewPage;

ProductOverviewPage.getLayout = (page) => (
  <ProductDashboardLayout children={page} id="overview" />
);
