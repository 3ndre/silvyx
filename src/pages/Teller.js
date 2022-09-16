import { useAccount, useNetwork } from 'wagmi';
import { Navigate } from 'react-router-dom';
// @mui
import { Container, Typography } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components 
import Page from '../components/Page';

import SwitchNetwork from './authentication/SwitchNetwork';
import BecomeTeller from './dashboard/BecomeTeller';


// ----------------------------------------------------------------------

export default function Teller() {
  const { themeStretch } = useSettings();

  const { isConnected } = useAccount()

  const { chain } = useNetwork()

  if (!isConnected) {
    return <Navigate to="/connect" />;
  }

  return (
    <Page title="Teller">
      <Container maxWidth={themeStretch ? false : 'xl'}>

      <Typography variant="h3" component="h1" paragraph>
          Teller
        </Typography>

      {chain.id !== 80001 ? <SwitchNetwork/> : null}


        <BecomeTeller/>
      </Container>
    </Page>
  );
}
