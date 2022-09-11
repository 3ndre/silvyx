import { useAccount, useNetwork } from 'wagmi';
import { Navigate } from 'react-router-dom';
// @mui
import { Container, Typography } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';

import SwitchNetwork from './authentication/SwitchNetwork';

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


        <Typography variant="h3" component="h1" paragraph>
          Dashboard
        </Typography>

      </Container>
    </Page>
  );
}
