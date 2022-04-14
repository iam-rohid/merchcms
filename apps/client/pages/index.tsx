import { GetServerSideProps } from "next";

const Index = () => {
  return <div>Index</div>;
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
    redirect: {
      destination: "/dashboard",
    },
  };
};
