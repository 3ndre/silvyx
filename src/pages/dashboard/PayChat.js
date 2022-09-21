import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// @mui
import { Container, Card, Button, Box } from '@mui/material';

// hooks
import useSettings from '../../hooks/useSettings';
// components
import ChatWindow  from '../paychat/ChatWindow';

import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

export default function PayChat() {

  const { themeStretch } = useSettings();


 
  return (
    
      <Container maxWidth={themeStretch ? false : 'xl'}>

         <Box sx={{ display: 'flex', alignItems: 'center' }}>

            <Box sx={{ flexGrow: 1 }}>
            </Box>

            <Box sx={{ flexShrink: 0 }}>
              <Button startIcon={<Iconify icon="bx:arrow-back"/>} variant="outlined" style={{textDecoration: 'none', color: '#00AB55'}} component={Link} to="/chat">
                Back
              </Button>
            </Box>

            </Box>

            <br></br>
     
     <Card sx={{ height: '72vh', display: 'flex' }}>
          <ChatWindow />
      </Card>

      </Container>
      
  );
}
