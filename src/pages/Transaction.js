import { useAccount } from 'wagmi'
import { Navigate } from 'react-router-dom';
// @mui
import { Container, Typography } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import SendToken from './dashboard/SendToken';

// ----------------------------------------------------------------------

export default function Transaction() {
  const { themeStretch } = useSettings();

  const { isConnected} = useAccount()


  if (!isConnected) {
    return <Navigate to="/connect" />;
  }

  return (
    <Page title="Transaction">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Transaction
        </Typography>


        <SendToken/>
        
      </Container>
    </Page>
  );
}
