import React from 'react';

// @mui
import { Box, Stack,  Input, Divider, Button} from '@mui/material';
import { styled } from '@mui/material/styles';
// redux



// components
import Iconify from '../../components/Iconify';


import ChatMessageList from './ChatMessageList';
import ChatHeaderDetail from './ChatHeaderDetail';


// ----------------------------------------------------------------------


const RootStyle = styled('form')(({ theme }) => ({
  minHeight: 56,
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  paddingLeft: theme.spacing(2),
}));

// ----------------------------------------------------------------------




export default function ChatWindow() {

  



  return (
    <Stack sx={{ flexGrow: 1, minWidth: '1px' }}>
      
        <ChatHeaderDetail />
      

      <Divider />

      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <Stack sx={{ flexGrow: 1 }}>

          <ChatMessageList />

          <Divider />

          <RootStyle> 
         
            <Input fullWidth disableUnderline placeholder="Type a message"/>

            <Divider orientation="vertical" flexItem />

          <Button color="primary"  sx={{ mx: 1 }} type="submit" >
            <Iconify icon="ic:round-send" width={22} height={22} />
          </Button>
         
        </RootStyle>

        </Stack>

      
      </Box>
    </Stack>
  );
}


