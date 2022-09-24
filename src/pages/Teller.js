import React, { useState, useEffect } from "react";
import { useAccount, useNetwork } from 'wagmi';
import { Navigate } from 'react-router-dom';
// @mui
import { Container, Typography, Box } from '@mui/material';

// Tabs
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


// hooks
import useSettings from '../hooks/useSettings';
// components 
import Page from '../components/Page';

import SwitchNetwork from './authentication/SwitchNetwork';
import BecomeTeller from './dashboard/BecomeTeller';
import CancelTeller from './dashboard/CancelTeller';
import ActiveWithdraws from "./dashboard/ActiveWithdraws";
import PayChat from "./dashboard/PayChat";


// ----------------------------------------------------------------------

export default function Teller() {
  const { themeStretch } = useSettings();

  const { isConnected, address } = useAccount()

  const { chain } = useNetwork()

  const [userData, setUserData] = useState(null);


  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



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
    <Page title="Teller">
      <Container maxWidth={themeStretch ? false : 'xl'}>


      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>

      <Typography variant="h3" component="h1" paragraph>
          Teller
        </Typography>

        </Box>

        <Box sx={{ flexShrink: 0 }}>{ userData && userData.teller === true ? <CancelTeller id={userData && userData._id}/> : <BecomeTeller id={userData && userData._id}/>}</Box>

        </Box>

        <br></br>


        <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="All withdrawals" value="1" />
          </TabList>
        </Box>
        <TabPanel value="1" style={{marginTop: '20px'}}>

          {userData && userData.teller === false ? 
       
            <span style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>

            <Typography variant="h5" component="h1" paragraph>
              You do not have permission to access this page
            </Typography>

            </span>

            : <ActiveWithdraws/>}

        </TabPanel>
        
    
      </TabContext>

    
        

        



      {chain.id !== 80001 ? <SwitchNetwork/> : null}



      </Container>
    </Page>
  );
}
