import { Box } from '@mui/joy';
import { Typography, Link } from '@mui/material';
import { Stack } from '@mui/system';
import Image from 'next/image';
import Head from 'next/head'
import { useContext, useState } from 'react';
import styles from '../../styles/CryptoId.module.css';
import WebIcon from '@mui/icons-material/Web';
import GridViewIcon from '@mui/icons-material/GridView';
import ForumIcon from '@mui/icons-material/Forum';
import { ThemeContext } from '../../pages/_app';
import { CoinChart } from '../../components/CoinChart';
import ReactHtmlParser from "react-html-parser";
import CoinMarketTable from '../../components/CoinMarketTable';

function CryptoId({singleCoin}) {

  const [coinData, setCoinData] = useState(singleCoin);
  const currency = useContext(ThemeContext)  
  return (
    <>
    <Head>
        <title>{coinData.name} - Crypto Ticker</title>
        <meta name="description" content={`Check Price for ${coinData.name}`}/>
      </Head>
    {singleCoin && coinData && (<Box className={styles.sinGC}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 5, sm: 10, md: 50 }}>

      <Stack direction="column">
        <Stack direction="row" spacing={2}>
          <img src={coinData.image.large} width='50px' height='50px' />
          <Typography variant='h3' component='h1'>
          {coinData.name}
          </Typography>
          <Typography variant='h6'>
          {coinData.symbol.toUpperCase()}
          </Typography>
        </Stack>
        <Stack direction="column" spacing={2} className={styles.infoCoin}>
          <Typography variant='span'  className={styles.infoCoinSpan}>
            Rank #{coinData.market_cap_rank}
          </Typography>
          <Stack direction="row" spacing={2} className={styles.infoWeb}>
          <Typography variant='span' sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
          <WebIcon sx={{marginRight: '5px'}}/> <Link href={coinData.links.homepage[0]} variant="span">
             Official Website
            </Link>
           </Typography>
           <Typography variant='span' sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
           <GridViewIcon sx={{marginRight: '5px'}} /> <Link href={coinData.links.blockchain_site[0]} variant="span">
             Blockchain
            </Link>
           </Typography>
           <Typography variant='span' sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
            <ForumIcon sx={{marginRight: '5px'}} /> <Link href={coinData.links.official_forum_url[0]} variant="span">
            Forum
            </Link>
           </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="column" spacing={2}>
          <Typography variant='span'>
            {coinData.name} Price ({coinData.symbol.toUpperCase()})
          </Typography>
          <Typography variant='h3' component='h2' sx={{fontWeight: '500'}}>
          {currency === 'USD' ? '$' : '₹'}{coinData?.market_data.current_price[currency.toLowerCase()].toLocaleString("en-US")}
          </Typography>
        
          <Typography variant='span' sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',fontWeight: '500',borderRadius: '5px', padding:'10px 15px', width: '100px',color: '#fff', backgroundColor: Math.sign(coinData.market_data.price_change_percentage_24h) === 1 ?  '#16c784' : '#ea3943'}}>
              {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Typography className={styles.coinMark} variant='span'><b>Market Cap</b> <br></br>{currency === 'USD' ? '$' : '₹'}{coinData.market_data.market_cap[currency.toLowerCase()].toLocaleString("en-US")}</Typography>
            <Typography className={styles.coinMark} variant='span'><b>Volume 24h</b> <br></br>{currency === 'USD' ? '$' : '₹'}{coinData.market_data.total_volume[currency.toLowerCase()].toLocaleString("en-US")}</Typography>
          
            <Typography className={styles.coinMark} variant='span'><b>Circulating Supply</b> <br></br>{coinData.market_data.circulating_supply.toLocaleString("en-US")} {coinData.symbol.toUpperCase()}</Typography>
            <Typography className={styles.coinMark} variant='span'><b>Max Supply</b> <br></br> {coinData.market_data.max_supply === null ? "No Data" : coinData.market_data.max_supply.toLocaleString("en-US")} {coinData.symbol.toUpperCase()}</Typography>
          </Stack>
          </Stack>
      </Stack>
      <CoinChart currency={currency} />
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={10}>
        <Stack>
         {coinData?.description.en && <Typography variant='h3' sx={{fontWeight: '500'}}>
            {coinData.name}
          </Typography>}
          <Typography variant='p' className={styles.aTagHigh} sx={{fontSize: '18px',color: '#00000080', paddingTop: '20px',}}>
            {ReactHtmlParser(coinData?.description.en.split(". ", 5))}.
          </Typography>
        </Stack>
        <Stack >
        <Typography variant='h3'  sx={{fontWeight: '500', paddingBottom: '20px'}} >
            {coinData.name} Markets
          </Typography>
          <CoinMarketTable coinData={coinData} />
        </Stack>
      </Stack>
    </Box>)}
    </>
  )
}

export default CryptoId

export async function getServerSideProps(context){

  const {params} = context;
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/${params.cryptoId}`)
  const data = await response.json()

  return {
    props: {
      singleCoin: data,
    }
  }
}