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
import MyWithdraws from "./dashboard/MyWithdraws";


// ----------------------------------------------------------------------

export default function Withdraw() {
  const { themeStretch } = useSettings();

  const { isConnected, address } = useAccount()

  const { chain } = useNetwork()

  const [, setUserData] = useState(null);

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


  





  //------------------------------------------------

  if (!isConnected) {
    return <Navigate to="/connect" />;
  }

  return (
    <Page title="Withdraw">
      <Container maxWidth={themeStretch ? false : 'xl'}>


      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>

      <Typography variant="h3" component="h1" paragraph>
          Withdraw
        </Typography>

        </Box>

        

        </Box>

        <br></br>


   <MyWithdraws/>


        

        



      {chain.id !== 80001 ? <SwitchNetwork/> : null}



      </Container>
    </Page>
  );
}
