import { ApolloProvider } from "@apollo/client";
import SEO from "components/SEO";
import { apolloClient } from "src/utils/apollo-client";
import { CustomAppProps } from "src/types";
import { ChakraProvider } from "@chakra-ui/react";

const App = ({ Component, pageProps }: CustomAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider>
        <SEO />
        {getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default App;
