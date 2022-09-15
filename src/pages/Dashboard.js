import { useAccount, useNetwork } from 'wagmi';
import { Navigate } from 'react-router-dom';
// @mui
import { Container, Grid } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components 
import Page from '../components/Page';

import SwitchNetwork from './authentication/SwitchNetwork';
import SendReceive from '../components/sections/SendReceive';
import Balance from '../components/sections/Balance';

// ----------------------------------------------------------------------

export default function Dashboard() {
  const { themeStretch } = useSettings();

  const { isConnected } = useAccount()

  const { chain } = useNetwork()

  if (!isConnected) {
    return <Navigate to="/connect" />;
  }

  return (
    <Page title="Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>

      {chain.id !== 80001 ? <SwitchNetwork/> : null}


      <Grid container spacing={3}>

          <Grid item xs={12} md={8}>
            <SendReceive />
          </Grid>

          <Grid item xs={12} md={4}>
            <Balance />
          </Grid>
          
      </Grid>

      </Container>
    </Page>
  );
}
