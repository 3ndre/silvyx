import { useAccount } from 'wagmi'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// @mui
import {Stack, Button} from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';



//-------------------------------------------

//mui alert
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


//---------------------------------------------------------


//global variables
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


// ----------------------------------------------------------------------


export default function ChooseTeller({userData, walletAddress}) {



  const [open2, setOpen2] = useState(false); //alert

  const [message, setMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState('');


  const [tellerData, setTellerData] = useState(null); //teller data for conversation


  const handleClose2 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen2(false);
    };



  //Getting teller data   
       
        const local_access_token = localStorage.getItem('access_token');
        const access_token = JSON.parse(local_access_token)

      
        //fetching user data

        let header = {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token.token}`,
              "x-auth-wallet": walletAddress,
          }
      }


        useEffect(() => {
        
          fetch('http://localhost:5000/api/users/me', header)
              .then(response => response.json())
              .then(data => setTellerData(data));
              
        
        }, []);
  

  
    //------------------------------------------------------------------------------------------

    async function chooseTeller(e) {

      e.preventDefault();
  
      try {

           //localstorage get access token
            const local_access_token = localStorage.getItem('access_token');
            const access_token = JSON.parse(local_access_token)

            //Create new conversation
            
            var postData = {
              senderId: tellerData._id,
              receiverId: userData._id
            };


            let axiosConfig = {
              headers: {
                  'Content-Type': 'application/json;charset=UTF-8',
                  "Access-Control-Allow-Origin": "*",
                  'Authorization': `Bearer ${access_token.token}`,
              }
            };


            axios.post('http://localhost:5000/api/conversations', postData, axiosConfig)
              .then((res) => {
                console.log("Conversation started successfully!");
                window.location.reload();
              })
              .catch((err) => {
                console.log("Conversation unsuccessful");
              })



              //Update accepted status
            
            var postData2 = {
                accepted: [
                  {
                    wallet: walletAddress //teller address
                  }
                ]
              };
  
  
              let axiosConfig2 = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                    'Authorization': `Bearer ${access_token.token}`,
                    "x-auth-id": userData._id,
                }
              };
  
  
              axios.put('http://localhost:5000/api/users/me', postData2, axiosConfig2)
                .then((res) => {
                  console.log("Accept wallet added successfully!");
                  window.location.reload();
                })
                .catch((err) => {
                  console.log("Wallet acceptance unsuccessful");
                })
  



          setAlertMessage('');
  
          setMessage('Teller choosed successfully!');
         
          setOpen2(true);
  
      } catch (e) {
       
        setAlertMessage('Oops, something went wrong!');
        setOpen2(true);
      }
    }

  
    console.log(userData)
    console.log(tellerData)


  return (
   <>


        <Button variant="contained" onClick={chooseTeller}>Choose</Button>
      

        <Stack spacing={2} sx={{ width: '100%' }} >
            <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2} anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
        }}>

                {alertMessage ?
                <Alert onClose={handleClose2} severity="error" sx={{ width: '100%' }}>
                {alertMessage}
                </Alert>
                : 
                <Alert onClose={handleClose2} severity="success" sx={{ width: '100%', color: 'white' }}>
                {message}
            </Alert>
                }
            
            </Snackbar>
        </Stack>
                
        
  </>
   
  );
}
