import ProductDashboardLayout from "layouts/common-layouts/product-dashboard-layout";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { CustomNextPage } from "types/next.type";
import ProductOverviewPage from "./overview";

const ProductPage: CustomNextPage = () => {
  return <ProductOverviewPage />;
};

export default ProductPage;

ProductPage.getLayout = (page) => (
  <ProductDashboardLayout children={page} id="overview" />
);

export const getStaticPaths: GetStaticPaths = async (context) => {
  return {
    paths: [
      "/my-store-1/my-product-1",
      "/my-store-1/my-product-2",
      "/my-store-1/my-product-3",
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};

// TODO: Start designing product pages in figma... 🙏
