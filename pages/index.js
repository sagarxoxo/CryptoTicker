import { Autocomplete, Box, Button, Pagination, Stack, TextField, Typography } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import { CoinsTable } from '../components/CoinsTable'
import styles from '../styles/Home.module.css'
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../pages/_app';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export default function Home() {

  const [pageNum, setPageNum] = useState('1');
  const [coinsData, setCoinData] = useState();
  const currency = useContext(ThemeContext)  

  const [allCoinLits, setAllCoinList] = useState();
  const [userSearchCoins, setUserSearchCoin] = useState();

  const [switchPagi, setSwitchPagi] = useState(true);

    async function fetchData() {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=${pageNum}&sparkline=false`);
        const coinData = await res.json();
        setCoinData(coinData)

        const res1 = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
        const allCoinDataList = await res1.json();
        setAllCoinList(allCoinDataList)
        setSwitchPagi(prevState => true)
    }
    useEffect(() => {
        fetchData();
    }, []);

  function handlePagination(e){
    setPageNum(e.target.textContent)
  }

  function handleSearch(){
    const allCo = allCoinLits && allCoinLits.filter((allCoin) => allCoin.name === userSearchCoins)
    setCoinData(allCo)
    setSwitchPagi(prevState => false)
  }

  const searchConins = [ allCoinLits && allCoinLits.map((coinName) =>  {return coinName.name})];

  const option = searchConins[0] && searchConins[0].map((coinName) => coinName)
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Crypto Ticker</title>
        <meta name="description" content="Get Price Update of Top 100 Cryptocurrency" />
        <link rel="icon" href="/favicon1.ico" />
      </Head>

    <Box className={styles.headSec}>
    <Typography variant="h2" component="h1">Track Top 100 Cryptocurrency</Typography>
    </Box>

    <Box className={styles.cryptoSec}>

    <Stack sx={{width: '100%',}} >
    <Stack direction="row" spacing={1} sx={{width: '100%',}}>
    <Autocomplete freeSolo disableClearable className={styles.serachInp}
        value={userSearchCoins || null}
        onChange={(event, value) => {
          setUserSearchCoin(value);
        }}
        id="setUserSearchCoin"
        options={option ? option : ['Bitcoin', 'Ethereum']}
        
        renderInput={(params) => 
        <TextField {...params} InputProps={{
          ...params.InputProps,
          type: 'search',
        }} />}
      />
      <Button variant="solid" color="inherit"  type='submit' onClick={handleSearch} sx={{color: '#fff',backgroundColor: '#000',height: '55px', '&:hover': {backgroundColor: "#00000090",}, }} >Search</Button>
    </Stack>   
    <CoinsTable coinsData={coinsData} currency={currency} />
    {switchPagi && <Pagination className={styles.pagi} count={10} page={Number(pageNum)} onChange={(e) => handlePagination(e)} variant="outlined" shape="rounded" />}
    {!switchPagi && <Button variant="solid" color="inherit"  type='submit' onClick={fetchData} sx={{color: '#fff',backgroundColor: '#000',height: '55px', marginTop: '40px', '&:hover': {backgroundColor: "#00000090",}, }} >View All Coins</Button>}
    </Stack>
    
    </Box>
  
    </div>
  )
}




