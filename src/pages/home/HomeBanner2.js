import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Box, Container, Typography } from '@mui/material';
// components
import Image from '../../components/Image';
import { MotionViewport, varFade } from '../../components/animate';
import Iconify from '../../components/Iconify';
// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 456,
  margin: 'auto',
  marginBottom: '20px',
  overflow: 'hidden',
  paddingBottom: theme.spacing(10),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  backgroundImage: `linear-gradient(135deg,
    ${theme.palette.primary.main} 0%,
    ${theme.palette.primary.dark} 100%)`,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    maxWidth: '100%',
    paddingBottom: 0,
    alignItems: 'center',
  },
}));

// ----------------------------------------------------------------------

export default function HomeBanner2() {
  return (
    <Container component={MotionViewport}>
      <ContentStyle>
        <Box
          component={m.div}
          variants={varFade().inUp}
          sx={{
            mb: { xs: 3, md: 0 },
          }}
        >
          <m.div animate={{ y: [-20, 0, -20] }} transition={{ duration: 4, repeat: Infinity }}>
            <Image
              visibleByDefault
              alt="nft mint"
              src="/img/wallet.png"
              disabledEffect
              sx={{ maxWidth: 460 }}
            />
          </m.div>
        </Box>

        <Box
          sx={{
            pl: { md: 10 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Box component={m.div} variants={varFade().inDown} sx={{ color: 'common.white', mb: 5 }}>
            <Typography variant="h2">
               Withdraw your funds 
              <br /> with a human teller
            </Typography>
          </Box>
          <m.div variants={varFade().inDown}>
            <Button
              size="large"
              variant="contained"
              component={RouterLink}
              endIcon={<Iconify icon={'ic:outline-dashboard'} width={20} height={20} />}
              to="/connect"
              sx={{
                whiteSpace: 'nowrap',
                boxShadow: (theme) => theme.customShadows.z8,
                color: (theme) => theme.palette.getContrastText(theme.palette.common.white),
                bgcolor: 'common.white',
                '&:hover': { bgcolor: 'grey.300' },
              }}
            >
              Dashboard
            </Button>
          </m.div>
        </Box>
      </ContentStyle>
    </Container>
  );
}
