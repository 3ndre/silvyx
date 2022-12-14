
// @mui
import { styled } from '@mui/material/styles';
import { Avatar, Box, Typography } from '@mui/material';


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(3),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 320,
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.neutral,
}));

// const InfoStyle = styled(Typography)(({ theme }) => ({
//   display: 'flex',
//   marginBottom: theme.spacing(0.75),
//   color: theme.palette.text.secondary,
// }));

//----------------------------------------------------------------------

export default function ChatMessageItem({item, userId}) {




  return (
    <RootStyle>
      <Box
        sx={{
          display: 'flex',
          
          ...(item.sender === userId ?  {
            ml: 'auto',
          } : null),
        }}
      >
      
      {item.sender !== userId ? 
          <Avatar alt="" src="" sx={{ width: 32, height: 32, mr: 2 }} /> : null}
     

        <div>
         

          <ContentStyle
            sx={{
              ...(item.sender === userId ? { color: 'grey.800', bgcolor: 'primary.lighter' } : null),
            }}
          >
           
              <Typography variant="body2">{item.text}</Typography>
            
          </ContentStyle>
        </div>
      </Box>
    </RootStyle>
  );
}
