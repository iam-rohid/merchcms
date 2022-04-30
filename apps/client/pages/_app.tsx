import { ApolloProvider } from "@apollo/client";
import SEO from "components/SEO";
import { apolloClient } from "src/utils/apollo-client";
import { CustomAppProps } from "src/types";
import "../styles/main.scss";

const App = ({ Component, pageProps }: CustomAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ApolloProvider client={apolloClient}>
      <SEO />
      {getLayout(<Component {...pageProps} />)}
    </ApolloProvider>
  );
};

export default App;
