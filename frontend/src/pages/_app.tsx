
import React from 'react'
import '../login/style.scss'
// import '../common/components/Modal/modal.css'
import App from 'next/app'
  
export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}