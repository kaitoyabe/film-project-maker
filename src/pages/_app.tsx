import { AppProps } from "next/app";
import { FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "../styles/globals.css";

import TierListProvider from "providers/TierListProvider";

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <DndProvider backend={HTML5Backend}>
    <TierListProvider>
      <Component {...pageProps} />
    </TierListProvider>
  </DndProvider>
);

export default MyApp;
