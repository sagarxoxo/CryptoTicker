import { Table, TableBody , TableCell , TableContainer , TableHead , TableRow , Paper, Typography, Box  } from '@mui/material';
import Image from 'next/image';

import styles from '../styles/Home.module.css';
import { CoinChart } from './CoinChart';

export const CoinsTable = (props) => {

  return (
    <TableContainer component={Paper} className={styles.tbSty}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">24H Change</TableCell>
            <TableCell align="left">Market Cap</TableCell>
            <TableCell align="left">Circulating Supply</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.coinsData && props.coinsData.map((coin) => (
            <TableRow onClick={() => {window.location.href = `/${coin.id.toLowerCase().replace(/\s+/g, '-')}`}}
              key={coin.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0, }, '&:hover': {backgroundColor: "#00000010",}, cursor: 'pointer' }}
              className={styles.tableSty}
            >
              <TableCell >
                {coin.market_cap_rank}
              </TableCell>
              <TableCell className={styles.nameSty} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center',}}>
                <img src={coin.image} width="40px" height="40px"/>
                <Box className={styles.inNameSty}>
                <Typography variant='span' sx={{fontWeight: 600}}>
                    {coin.name}
                </Typography>
                <Typography variant='span' sx={{opacity: 0.5,}}>
                    {(coin.symbol).toUpperCase()}
                </Typography>
                </Box>
            </TableCell>
              <TableCell align="left">{props.currency === 'USD' ? '$' : '₹'}{coin.current_price}</TableCell>
              <TableCell sx={{color: Math.sign(coin.price_change_percentage_24h) === 1 ?  '#16c784' : '#ea3943'}} align="left">{coin.price_change_percentage_24h.toFixed(2)}%</TableCell>
              <TableCell align="left">{props.currency === 'USD' ? '$' : '₹'}{coin.market_cap.toLocaleString("en-US")}</TableCell>
              <TableCell align="left">{coin.circulating_supply.toFixed(0)} {(coin.symbol).toUpperCase()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
