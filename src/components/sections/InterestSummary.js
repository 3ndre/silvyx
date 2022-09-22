// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Typography, Stack } from '@mui/material';
// utils
import { fNumber, fPercent } from '../../utils/formatNumber';
// components
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(1),
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16),
}));

// ----------------------------------------------------------------------


export default function InterestSummary({ title, percent, total}) {
  

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" paragraph>
          {title}
        </Typography>
        <Typography variant="h3" gutterBottom>
          {fNumber(total)} days
        </Typography>

        <Stack direction="row" alignItems="center">
          <IconWrapperStyle
            sx={{
              ...(percent < 0 && {
                color: 'error.main',
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.16),
              }),
            }}
          >
            <Iconify width={16} height={16} icon={'eva:trending-up-fill'} />
          </IconWrapperStyle>

          <Typography variant="subtitle2" component="span">
            {percent > 0 && '+ '}
            {fPercent(percent)}
          </Typography>
          <Typography variant="body2" component="span" noWrap sx={{ color: 'text.secondary' }}>
            &nbsp;interest
          </Typography>
        </Stack>
      </Box>


    </Card>
  );
}
