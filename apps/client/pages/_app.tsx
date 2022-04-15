import SEO from "components/SEO";
import { ColorSchemeProvider } from "hooks/color-scheme";
import { CustomAppProps } from "types";
import "./app.css";

const App = ({ Component, pageProps }: CustomAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <SEO />
      <ColorSchemeProvider>
        {getLayout(<Component {...pageProps} />)}
      </ColorSchemeProvider>
    </>
  );
};

export default App;
