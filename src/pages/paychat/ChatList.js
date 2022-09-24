import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, Card, Avatar, CardHeader, Typography } from '@mui/material';

// components
import Iconify from '../../components/Iconify';
import SkeletonItem from "../../components/SkeletonItem";


// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 40,
  height: 40,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
}));

// ----------------------------------------------------------------------

export default function ChatList({userData}) {

   //---------------UserData----------------------------

   const [conversationData, setConversationData] = useState(null);

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
     
       fetch(`https://silvyxbackend.glitch.me/api/conversations/${userData}`, header)
           .then(response => response.json())
           .then(data => setConversationData(data));
           
     
     }, [userData]);

  


 

  return (
    <Card>
      <CardHeader title="All conversation" />
      <Stack spacing={3} sx={{ p: 3 }}>
       
      {conversationData === null ? <SkeletonItem/> :
      <>
      {conversationData && conversationData.reverse().map((item, index) => (
          <ChatListItem item={item} id={userData} index={index} key={index}/>
      ))}
      </>
      }
      
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------


function ChatListItem({item, index, id}) {

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
     
       fetch(`https://silvyxbackend.glitch.me/api/users/${item.members[0] === id ?  item.members[1] : item.members[0]}`, header)
           .then(response => response.json())
           .then(data => setUser(data));
           
     
     }, [id]);



  return (
    <Stack direction="row" alignItems="center" spacing={2} to={`/chat/${item._id}`} component={Link} style={{textDecoration: 'none', color: 'white'}}>
      <Avatar alt="" src="" />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{user && user.wallet.substring(0, 12)}...</Typography>
        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            display: 'flex',
            alignItems: 'center',
            color: 'text.secondary',
          }}
        >
          <Iconify icon={user && user.teller === true ? 'fluent:person-money-24-filled' : 'carbon:user-filled'} sx={{ width: 16, height: 16, mr: 0.5 }} />
          {user && user.teller === true ? <>Teller</> : <>User</>}
        </Typography>
      </Box>

      <IconWrapperStyle
        sx={{
          ...(index === 1 && {
            color: 'info.main',
            bgcolor: (theme) => alpha(theme.palette.info.main, 0.08),
          }),
          ...(index === 2 && {
            color: 'error.main',
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
          }),
        }}
      >
        <Iconify icon={'akar-icons:chat-edit'} width={20} height={20} />
      </IconWrapperStyle>
    </Stack>
  );
}
