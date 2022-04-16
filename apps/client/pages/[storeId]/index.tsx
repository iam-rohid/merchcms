import SEO from "components/SEO";
import StoreDashboardLayout from "layouts/common-layouts/store-dashboard-layout";
import { GetStaticPaths, GetStaticProps } from "next";
import { CustomNextPage } from "types/next.type";
import StoreOverviewPage from "./overview";

const StorePage: CustomNextPage = () => {
  return <StoreOverviewPage />;
};

export default StorePage;

StorePage.getLayout = (page) => {
  return (
    <>
      <SEO title="Store Dashboard" />
      <StoreDashboardLayout children={page} id="overview" />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  return {
    paths: ["/my-store-1", "/my-store-2", "/my-store-3"],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};
