import React, { useState, useEffect } from "react";
import { useAccount, useNetwork } from 'wagmi';
import { Navigate } from 'react-router-dom';
// @mui
import { Container, Typography, Box } from '@mui/material';


// hooks
import useSettings from '../hooks/useSettings';
// components 
import Page from '../components/Page';

import SwitchNetwork from './authentication/SwitchNetwork';
import ChatList from "./paychat/ChatList";


// ----------------------------------------------------------------------

export default function Chat() {
  const { themeStretch } = useSettings();

  const { isConnected, address } = useAccount()

  const { chain } = useNetwork()



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
          'Authorization': `Bearer ${access_token && access_token.token}`,
          "x-auth-wallet": address,
      }
  }


    useEffect(() => {
    
      fetch('https://silvyxbackend.glitch.me/api/users/me', header)
          .then(response => response.json())
          .then(data => setUserData(data));
          
    
    }, []);







  //------------------------------------------------

  if (!isConnected) {
    return <Navigate to="/connect" />;
  }

  return (
    <Page title="Chat">
      <Container maxWidth={themeStretch ? false : 'xl'}>


      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>

      <Typography variant="h3" component="h1" paragraph>
          Chat
        </Typography>

        </Box>

        </Box>

        <br></br>


        <ChatList userData={userData && userData._id}/>

      {chain.id !== 80001 ? <SwitchNetwork/> : null}



      </Container>
    </Page>
  );
}
