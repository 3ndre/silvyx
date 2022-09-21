import React, { useState, useEffect } from "react";

// @mui
import { styled } from '@mui/material/styles';
import { Box, Avatar, Typography, Container, Button } from '@mui/material';
import PaymentReceived from "../dashboard/PaymentReceived";

// hooks
import useSettings from '../../hooks/useSettings';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  flexShrink: 0,
  minHeight: 92,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 3),
}));

// ----------------------------------------------------------------------


export default function ChatHeaderDetail({conversationDataById, userId, conversationId, status, userInfo}) {

  
  //---------------UserData----------------------------


  const [user, setUser] = useState(null);

 

  //localstorage get access token
  const local_access_token = localStorage.getItem('access_token');
  const access_token = JSON.parse(local_access_token)

  
    //fetching user data

    let header = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token && access_token.token}`,
      }
  }



    useEffect(() => {
    
      fetch(`http://localhost:5000/api/users/${conversationDataById && conversationDataById.members[0] === userId ? conversationDataById && conversationDataById.members[1] : conversationDataById && conversationDataById.members[0]}`, header)
          .then(response => response.json())
          .then(data => setUser(data));
          
    
    }, [userId, conversationDataById]);

  

  return (
    <RootStyle>

     <OneAvatar user={user && user} userId={userId && userId} conversationId={conversationId} status={status} userInfo={userInfo}/>

      
    </RootStyle>
  );
}

// ----------------------------------------------------------------------


function OneAvatar({user, userId, conversationId, status, userInfo}) {

  const { themeStretch } = useSettings();
 
  console.log(userInfo)
  
  return (
    <Container maxWidth={themeStretch ? false : 'xl'}>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <Avatar src="" alt="" />
      </Box>
      <Box sx={{ ml: 2}}>
        <Typography variant="subtitle2" style={{textTransform: 'capitalize'}}>{user && user.wallet.substring(0, 12)}...</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {user && user.teller === true ? <>Teller</> : <>User</>}
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
      </Box>

      {userInfo && userInfo.teller === true && userInfo.accepted.length === 0 ?
        null
      : status && status === true ?
      <Box sx={{ flexShrink: 0 }}>
        <PaymentReceived tellerAddress={user && user.wallet} userId={userId && userId} conversationId={conversationId}/>
      </Box>
      :
       <Box sx={{ flexShrink: 0 }}>
        <Button variant="contained" disabled>Closed</Button>
      </Box>
      }
     
    </Box>
    </Container>
  );
}
