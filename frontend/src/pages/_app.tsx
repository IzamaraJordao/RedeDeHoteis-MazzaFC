
//import { wrapper } from "../store/store";
import React from 'react'
// import '../login/style.scss'
import App from 'next/app'
import '../common/theme/theme.css'
  
export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}
