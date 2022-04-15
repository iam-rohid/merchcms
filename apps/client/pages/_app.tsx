import { ColorSchemeProvider } from "hooks/color-scheme";
import { CustomAppProps } from "types";
import "./app.css";

const App = ({ Component, pageProps }: CustomAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ColorSchemeProvider>
      {getLayout(<Component {...pageProps} />)}
    </ColorSchemeProvider>
  );
};

export default App;
