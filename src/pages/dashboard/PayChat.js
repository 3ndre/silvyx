import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAccount } from 'wagmi';
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

  const { id } = useParams();

  const { address } = useAccount()

  //---------------UserData----------------------------

  const [userData, setUserData] = useState(null);
 

  //localstorage get access token
  const local_access_token = localStorage.getItem('access_token');
  const access_token = JSON.parse(local_access_token)

  
    //fetching user data

    let header = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token.token}`,
          "x-auth-wallet": address,
      }
  }


    useEffect(() => {
    
          
      fetch('http://localhost:5000/api/users/me', header)
          .then(response => response.json())
          .then(data => setUserData(data));
          
    
    }, []);

   


 
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
          <ChatWindow conversationId={id} userId={userData && userData._id} userInfo={userData && userData}/>
      </Card>

      </Container>
      
  );
}
