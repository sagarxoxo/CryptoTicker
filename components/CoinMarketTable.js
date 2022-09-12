import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
const CoinMarketTable = ({coinData}) => {


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left"><b>Source</b></TableCell>
            <TableCell align="left"><b>Pairs</b></TableCell>
            <TableCell align="left"><b>Price</b></TableCell>
            <TableCell align="left"><b>Volume</b></TableCell>
            <TableCell align="left"><b>Trade At</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coinData.tickers.slice(0, 10).map((coinDetail) => (
            <TableRow
              key={coinDetail.trade_url}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            >
              <TableCell align="left">{coinDetail.market.name}</TableCell>
              <TableCell align="left">{coinDetail.base}/{coinDetail.target}</TableCell>
              <TableCell align="left">${coinDetail.converted_last.usd}</TableCell>
              <TableCell align="left">${coinDetail.volume.toFixed(0).toLocaleString("en-US")}</TableCell>
              <TableCell align="left">
                <Button component='a' href={coinDetail.trade_url}>
                    Visit Site
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CoinMarketTable