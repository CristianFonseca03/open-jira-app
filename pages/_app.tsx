import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";

import { UIProvider } from "../context/ui";
import { EntriesProvider } from "../context/entries/";

import { lightTheme, darkTheme } from "../themes";

import { SessionProvider } from "next-auth/react";
import { HourWidget } from "../components/ui/HourWidget";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <HourWidget>
      <SnackbarProvider maxSnack={3}>
        <SessionProvider session={session}>
          <EntriesProvider>
            <UIProvider>
              <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Component {...pageProps} />
              </ThemeProvider>
            </UIProvider>
          </EntriesProvider>
        </SessionProvider>
      </SnackbarProvider>
    </HourWidget>
  );
}

export default MyApp;
