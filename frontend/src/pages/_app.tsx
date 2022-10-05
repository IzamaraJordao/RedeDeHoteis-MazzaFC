import React, {useState } from 'react'
import '../common/theme/theme.css'
import { wrapper } from "../store/store";
import type { AppProps } from "next/app";
import Header from "../common/components/contexts/index"
import {ThemeProvider} from "styled-components";
import GlobalStyle from "../common/theme/global";
import light from "../common/theme/light";
import dark from "../common/theme/dark";




function MyApp({ Component, pageProps:{session, ...pageProps }}: AppProps) {
  const [theme, setTheme] = useState(light);

  const toggleTheme = () => {
    setTheme(theme.title === "light" ? dark : light);
  };
  

  return (

    <ThemeProvider theme={theme} >
      <GlobalStyle />
      <Header toggleTheme={toggleTheme} />
      
        <Component {...pageProps} />
    
      </ThemeProvider>
     
  )

 } 


export default wrapper.withRedux(MyApp);
