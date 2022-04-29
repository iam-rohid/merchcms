import HomeLayout from "components/layouts/home-layout";
import { useEffect } from "react";
import { CustomNextPage } from "src/types/next.type";

const Index: CustomNextPage = () => {
  useEffect(() => {}, []);
  return <div>Home Page</div>;
};

Index.getLayout = (page) => <HomeLayout>{page}</HomeLayout>;

export default Index;
