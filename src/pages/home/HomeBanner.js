import { m } from 'framer-motion';
import { useAccount } from 'wagmi';

// @mui
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Typography, Button, Stack } from '@mui/material';


// components
import { MotionViewport, varFade } from '../../components/animate';

import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(7),
  },
}));
// ----------------------------------------------------------------------

export default function HomeBanner() {
  
  const { isConnected } = useAccount()
 
  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Box
          sx={{
            textAlign: 'center',
          }}
        >
          <m.div variants={varFade().inUp}>
            <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
              Silvyx
            </Typography>
          </m.div>

          <m.div variants={varFade().inUp}>
        <Typography variant="h2" sx={{ mb: 4}}> 
        Bankless <span style={{color: '#00AB55'}}>Payment Network</span>
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography
          sx={{
            mx: 'auto',
            maxWidth: 630,
            color: (theme) => (theme.palette.mode === 'light' ? 'text.secondary' : 'common.white'),
           mb: 4,
          }}
        >
          A payment network that doesn't rely on a financial institution to cash out but works with a human teller.
        </Typography>
      </m.div>


         
            <m.div variants={varFade().inUp} >
              <Button sx={{mb: 4}}
                size="large"
                variant="contained"
                to="/connect"
                style={{textDecoration: 'none'}}
                endIcon={<Iconify icon={isConnected && isConnected ? 'ic:outline-dashboard' : 'clarity:sign-in-line'} width={20} height={20} />}
                component={RouterLink}
              >
                {isConnected && isConnected ? 'Dashboard' : 'Connect'}
              </Button>
            </m.div>
           

            <Stack spacing={2.5}>
              <m.div variants={varFade().inRight}>
                <Typography variant="overline" sx={{ color: 'primary.light' }}>
                  Built on
                </Typography>
              </m.div>

              <Stack direction="row" spacing={1.5} justifyContent={{ xs: 'center'}} style={{marginBottom: '20px'}}>

                    <m.img
                    variants={varFade().inRight}
                    src="/icons/matic.svg"
                  />
                
              </Stack>
            </Stack>
           
        </Box>


        

      

      </Container>
    </RootStyle>
  );
}



