import React, { useState, useEffect } from "react";

// @mui
import { styled } from '@mui/material/styles';
import { Box, Avatar, Typography} from '@mui/material';

// components
import BadgeStatus from '../../components/BadgeStatus';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  flexShrink: 0,
  minHeight: 92,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 3),
}));

// ----------------------------------------------------------------------


export default function ChatHeaderDetail({conversationDataById, userId}) {


  
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
          'Authorization': `Bearer ${access_token.token}`,
      }
  }



    useEffect(() => {
    
      fetch(`http://localhost:5000/api/users/${conversationDataById && conversationDataById.members[0] === userId ? conversationDataById && conversationDataById.members[1] : conversationDataById && conversationDataById.members[0]}`, header)
          .then(response => response.json())
          .then(data => setUser(data));
          
    
    }, [userId, conversationDataById]);

  
  

  return (
    <RootStyle>

     <OneAvatar user={user && user}/>

      
    </RootStyle>
  );
}

// ----------------------------------------------------------------------


function OneAvatar({user}) {

 
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <Avatar src="" alt="" />
        <BadgeStatus status="active" sx={{ position: 'absolute', right: 2, bottom: 2 }} />
      </Box>
      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2" style={{textTransform: 'capitalize'}}>{user && user.wallet.substring(0, 12)}...</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {user && user.teller === true ? <>Teller</> : <>User</>}
        </Typography>
      </Box>
    </Box>
  );
}
