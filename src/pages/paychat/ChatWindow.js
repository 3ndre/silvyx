import React, { useState, useEffect } from "react";
import axios from 'axios';
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




export default function ChatWindow({conversationId, userId, userInfo}) {


 
  const [formValue, setFormValue] = useState('');
  const [conversationData, setConversationData] = useState(null);

  const sendMessage = async (e) => {
        
        e.preventDefault();

        try {


          //localstorage get access token
          const local_access_token = localStorage.getItem('access_token');
          const access_token = JSON.parse(local_access_token)

          //Update teller status 
          
          var postData = {
            conversationId: conversationId,
            sender: userId,
            text: formValue
          };


          let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                'Authorization': `Bearer ${access_token.token}`,
            }
          };


          axios.post('http://localhost:5000/api/messages', postData, axiosConfig)
            .then((res) => {
              console.log("Message sent successfully!");
              window.location.reload();
            })
            .catch((err) => {
              console.log("Message error");
            })



            setFormValue('');

        } catch (e) {

          console.log("Message Error")
          setFormValue('');
        }
  
  }


  
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
          
    fetch(`http://localhost:5000/api/conversations/id/${conversationId}`, header)
      .then(response => response.json())
      .then(data => setConversationData(data));
  
  }, [conversationId]);



  return (
    <Stack sx={{ flexGrow: 1, minWidth: '1px' }}>
      
        <ChatHeaderDetail conversationDataById={conversationData && conversationData} userId={userId && userId} conversationId={conversationId} status={conversationData && conversationData.status} userInfo={userInfo && userInfo}/>
      

      <Divider />

      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <Stack sx={{ flexGrow: 1 }}>

          <ChatMessageList conversationId={conversationId} userId={userId} />

          <Divider />

          <RootStyle onSubmit={sendMessage}> 
         
          {conversationData && conversationData.status === true ? 
            <Input fullWidth disableUnderline placeholder="Type a message"  value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
            :
            <Input fullWidth disabled disableUnderline placeholder="Conversation has been closed..."/>
          }

            <Divider orientation="vertical" flexItem />

        {conversationData && conversationData.status === true ? 
          <Button color="primary"  sx={{ mx: 1 }} type="submit" >
            <Iconify icon="ic:round-send" width={22} height={22} />
          </Button>
          :
          <Button color="primary"  sx={{ mx: 1 }} disabled >
            <Iconify icon="ic:round-send" width={22} height={22} />
          </Button>
        }
         
        </RootStyle>

        </Stack>

      
      </Box>
    </Stack>
  );
}


