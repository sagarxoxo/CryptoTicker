import { createContext, useEffect, useState } from 'react';
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/globals.css'
import '../styles/layout.css'

export const ThemeContext = createContext()

function MyApp({ Component, pageProps }) {
  
  const currencyList = ['INR' ,'USD'];

  const [value, setValue] = useState(currencyList[0]);
  const [inputValue, setInputValue] = useState('');
  const [user, setUser] =useState();
  const [curr, setCurr] = useState();
  useEffect(()=>{
    setUser(sessionStorage.getItem('cryUser'))
    setCurr(sessionStorage.getItem('currency'))
  },[curr])



  return <>
    <Header user={user} value={value} setValue={setValue} currencyList={currencyList} />
    <ThemeContext.Provider value={value}>
      <Component {...pageProps} />
    </ThemeContext.Provider>
      <Footer />
  </>
  
}

export default MyApp
