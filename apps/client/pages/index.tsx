import {
  useFindProfileQuery,
  useFindUserQuery,
  useSignUpWithEmailPasswordMutation,
} from "generated/graphql";
import HomeLayout from "layouts/home-layout";
import { useEffect } from "react";
import { CustomNextPage } from "types/next.type";

const Index: CustomNextPage = () => {
  useFindProfileQuery({
    variables: {
      input: {
        username: "rohid",
      },
    },
    onCompleted: ({ findProfile }) => {
      console.log(findProfile);
    },
  });
  useFindUserQuery({
    variables: {
      input: {
        username: "rohid",
      },
    },
    onCompleted: ({ findUser }) => {
      console.log(findUser);
    },
  });

  const [singUpMutation, { data, loading }] =
    useSignUpWithEmailPasswordMutation({
      onCompleted: ({ eamilPasswordSignUp }) => {
        console.log(eamilPasswordSignUp);
      },
    });

  useEffect(() => {}, []);

  return <div>Home Page</div>;
};

Index.getLayout = (page) => <HomeLayout>{page}</HomeLayout>;

export default Index;
