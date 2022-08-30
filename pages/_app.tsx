import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "../themes";
import { UIProvider } from "../context/ui";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    /* El ThemeProvider es un componente de material para derle el modo a la
      página */
    <UIProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </UIProvider>
  );
}

export default MyApp;
