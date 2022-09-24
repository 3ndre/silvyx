import React, { useState, useEffect } from "react";
import {useRef } from 'react';
//
import Scrollbar from '../../components/Scrollbar';

import ChatMessageItem from './ChatMessageItem';

// ----------------------------------------------------------------------


export default function ChatMessageList({conversationId, userId}) {
  const scrollRef = useRef(null);


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
    
          
      fetch(`https://silvyxbackend.glitch.me/api/messages/${conversationId}`, header)
          .then(response => response.json())
          .then(data => setConversationData(data));
    
    }, []);


   

 
  return (
    <>
      <Scrollbar scrollableNodeProps={{ ref: scrollRef }} sx={{ p: 3, height: 1 }}>
        

            {conversationData && conversationData.map((item) => (
              <ChatMessageItem item={item} userId={userId} key={item._id} />
              ))}
    
   
      </Scrollbar>

    </>
  );
}
