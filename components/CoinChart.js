import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { Box, Stack } from '@mui/joy';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import styles from '../styles/CryptoId.module.css'
import { Button } from '@mui/material';

export const CoinChart = ({currency, coinId}) => {

    const [chartData, setChartData] = useState();
    const [days, setDays] = useState(1);
    const router = useRouter();
    const { cryptoId } = router.query;

    async function fetchData() {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId ? cryptoId : coinId}/market_chart?vs_currency=${currency}&days=${days}`);
        const coinChartData = await res.json();
        setChartData(coinChartData.prices)
    }
    useEffect(() => {
        fetchData();
    }, [ days]);

    
  return (
    <>
    {chartData && (<Box className={styles.chartContioner}>
        <Stack direction='column'>
            <Stack direction={{ xs: 'row', sm: 'row' }} spacing={2} className={styles.dayBlock} sx={{  padding: '10px',borderRadius:'5px', width: 'auto'}}>
                <Button variant="contained" sx={{ backgroundColor: days === 1 ? '#000' : '#fff', color: days === 1 ? '#fff' : '#000'}} onClick={() => {setDays(1)}}>1D</Button>
                <Button variant="contained" sx={{ backgroundColor: days === 3 ? '#000' : '#fff', color: days === 3 ? '#fff' : '#000'}} onClick={() => {setDays(3)}}>3D</Button>
                <Button variant="contained" sx={{ backgroundColor: days === 7 ? '#000' : '#fff', color: days === 7 ? '#fff' : '#000'}} onClick={() => {setDays(7)}}>7D</Button>
                <Button variant="contained" sx={{ backgroundColor: days === 30 ? '#000' : '#fff', color: days === 30 ? '#fff' : '#000'}} onClick={() => {setDays(30)}}>1M</Button>
                <Button variant="contained" sx={{ backgroundColor: days === 90 ? '#000' : '#fff', color: days === 90 ? '#fff' : '#000'}} onClick={() => {setDays(90)}}>3M</Button>
                <Button variant="contained" sx={{ backgroundColor: days === 365 ? '#000' : '#fff', color: days === 365 ? '#fff' : '#000'}} onClick={() => {setDays(365)}}>1Y</Button>
            </Stack>
        <div className={styles.chartSty} >
        <Line 
        data={{
            labels: chartData.map((coin) => {
              let date = new Date(coin[0]);
              let time =
                date.getHours() > 12
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;
              return days === 1 ? time : date.toLocaleDateString();
            }),

            datasets: [
              {
                data: chartData.map((coin) => coin[1]),
                label: `Price ( Past ${days} Days ) in ${currency}`,
                borderColor: "#fffff",
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            elements: {
              point: {
                radius: 1,
              },
            },
          }}
        />
        </div>
        
        </Stack>
    </Box>)
    }
    </>
  )
}

