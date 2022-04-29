import { ApolloProvider } from "@apollo/client";
import SEO from "components/SEO";
import { ColorSchemeProvider } from "hooks/color-scheme";
import { apolloClient } from "src/utils/apollo-client";
import { CustomAppProps } from "types";
import "./app.css";

const App = ({ Component, pageProps }: CustomAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <SEO />
        <ColorSchemeProvider>
          {getLayout(<Component {...pageProps} />)}
        </ColorSchemeProvider>
      </ApolloProvider>
    </>
  );
};

export default App;
