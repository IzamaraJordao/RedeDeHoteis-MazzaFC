import type { AppProps } from "next/app";
//import { wrapper } from "../store/store";
import React from "react";
import '../components/Menu/menu.css'
import '../login/style.scss'




function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;