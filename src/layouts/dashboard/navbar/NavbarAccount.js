import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Typography, Avatar } from '@mui/material';


// ----------------------------------------------------------------------
import { useAccount, useBalance } from 'wagmi'

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

NavbarAccount.propTypes = {
  isCollapse: PropTypes.bool,
};

export default function NavbarAccount({ isCollapse }) {

  const { address } = useAccount()

  const { data, isError, isLoading } = useBalance({
    addressOrName: address,
  })

 
  if (isError) return <div>Error fetching balance!</div>



  return (
    <Link underline="none" color="inherit">
      <RootStyle
        sx={{
          ...(isCollapse && {
            bgcolor: 'transparent',
          }),
        }}
      >
       
      
      <Avatar src="/icons/matic.svg" alt="Matic token" />
      

        <Box
          sx={{
            ml: 2,
            transition: (theme) =>
              theme.transitions.create('width', {
                duration: theme.transitions.duration.shorter,
              }),
            ...(isCollapse && {
              ml: 0,
              width: 0,
            }),
          }}
        >
          <Typography variant="subtitle2" noWrap>

          {isLoading ? 'Loading...' :
           <>{(Math.round(data?.formatted * 100) / 100).toFixed(2)} {data?.symbol}</> 
          }
          
          </Typography>
          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            Wallet balance
          </Typography>
        </Box>
      </RootStyle>
    </Link>
  );
}
