import React from 'react';
// @mui
import { Container, Card } from '@mui/material';

// hooks
import useSettings from '../../hooks/useSettings';
// components
import ChatWindow  from '../paychat/ChatWindow';

// ----------------------------------------------------------------------

export default function PayChat() {

  const { themeStretch } = useSettings();


 
  return (
    
      <Container maxWidth={themeStretch ? false : 'xl'}>
     
     <Card sx={{ height: '72vh', display: 'flex' }}>
          <ChatWindow />
      </Card>

      </Container>
      
  );
}
