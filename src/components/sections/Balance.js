import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Typography, Stack } from '@mui/material';


import { fCurrency } from '../../utils/formatNumber';
// components
import BaseOptionChart from '../../components/chart/BaseOptionChart';

// ----------------------------------------------------------------------

import { useAccount, useBalance } from 'wagmi'

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  padding: theme.spacing(2),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter,
}));


// ----------------------------------------------------------------------

const TOTAL = "18,765";
const CHART_DATA = [{ data: [111, 136, 76, 108, 74, 54, 57, 84] }];

export default function Balance() {

  const { address } = useAccount()

  const { data, isError, isLoading } = useBalance({
    addressOrName: address,
  })

 
  if (isError) return <div>Error!</div>


  const chartOptions = merge(BaseOptionChart(), {
    chart: { sparkline: { enabled: true } },
    xaxis: { labels: { show: false } },
    yaxis: { labels: { show: false } },
    stroke: { width: 4 },
    legend: { show: false },
    grid: { show: false },
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fCurrency(seriesName),
        title: {
          formatter: () => '',
        },
      },
    },
    fill: { gradient: { opacityFrom: 0, opacityTo: 0 } },
  });

  return (
    <RootStyle>

   

      <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
        <div>
          <Typography sx={{ mb: 2, typography: 'subtitle2' }}>Total balance</Typography>
          <Typography sx={{ typography: 'h3' }}>{fCurrency(TOTAL)}</Typography>
        </div>

        <Typography variant="subtitle2" component="span" sx={{ ml: 0.5 }}>
        {isLoading ? 'Loading...' :
           <>{(Math.round(data?.formatted * 100) / 100).toFixed(2)} {data?.symbol}</> 
          }
          </Typography>
          

      </Stack>

      <ReactApexChart type="area" series={CHART_DATA} options={chartOptions} height={132} />
    </RootStyle>
  );
}
