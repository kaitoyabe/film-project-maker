import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AppProps } from "next/app";
import Head from "next/head";
import { FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "../styles/globals.css";

import ConfirmDialogProvider from "providers/ConfirmDialogProvider";
import DialogProvider from "providers/DialogProvider";
import MessageDialogProvider from "providers/MessageDialogProvider";
import TierListProvider from "providers/TierListProvider";
import { theme } from "utils/Theme";

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <LocalizationProvider
    dateAdapter={AdapterDayjs}
    adapterLocale="ja"
    dateFormats={{ monthAndYear: "YYYY年M月" }}
  >
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>Film Project Maker</title>
        <link rel="icon" href="/favicon.ico" />

        <meta httpEquiv="Content-Language" content="ja" />
        <meta name="google" content="notranslate" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <DndProvider backend={HTML5Backend}>
        <TierListProvider>
          <DialogProvider>
            <MessageDialogProvider>
              <ConfirmDialogProvider>
                <Component {...pageProps} />
              </ConfirmDialogProvider>
            </MessageDialogProvider>
          </DialogProvider>
        </TierListProvider>
      </DndProvider>
    </ThemeProvider>
  </LocalizationProvider>
);

export default MyApp;
