// @mui
import { styled } from '@mui/material/styles';
import { Typography, Card, CardContent } from '@mui/material';
//
import { WalletIllustration } from '../../assets';
import SendToken from '../../pages/dashboard/SendToken';
import ReceiveToken from '../../pages/dashboard/ReceiveToken';
import WithdrawToken from '../../pages/dashboard/WithdrawToken';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

// ----------------------------------------------------------------------

export default function SendRecieve() {
  return (
    <RootStyle>
      <CardContent
        sx={{
          color: 'grey.800',
          p: { md: 0 },
          pl: { md: 5 }
        }}
      >
        <Typography gutterBottom variant="h4">
          Silvyx Wallet
          <br /> 
        </Typography>

        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
          Easily send, recieve or withdraw crypto in a click.
        </Typography>
        
        
        <span style={{marginRight: '5px'}}><ReceiveToken/></span>
        <span style={{marginRight: '5px'}}><SendToken/></span>
        <span><WithdrawToken/></span>
      </CardContent>

      <WalletIllustration
        sx={{
          
          width: 250,
          margin: { xs: 'auto', md: 'inherit' }
        }}
      />
    </RootStyle>
  );
}
