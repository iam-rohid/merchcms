import HomeLayout from "layouts/home-layout";
import { GetServerSideProps } from "next";
import { CustomNextPage } from "types/next.type";

const Index: CustomNextPage = () => {
  return <div>Home Page</div>;
};

export default Index;
Index.getLayout = (page) => <HomeLayout children={page} />;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};
