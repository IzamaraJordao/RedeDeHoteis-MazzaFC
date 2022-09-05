import React from 'react'
import App from 'next/app'
import '../common/theme/theme.css'
import { wrapper } from "../store/store";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
  
// export default class MyApp extends App {
//   render() {
//     const { Component, pageProps } = this.props
//     return <Component {...pageProps} />
//   }
// }

export default wrapper.withRedux(MyApp);
