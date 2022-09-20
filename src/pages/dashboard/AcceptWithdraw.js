import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useAccount } from 'wagmi';


//---------------Mui Dialog -----------------
import Button from "@mui/material/Button";
import {Stack} from "@mui/material";


//-------------------------------------------

//mui alert
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


//---------------------------------------------------------



//global variables
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const AcceptWithdraw = ({walletAddress}) => {


  
  

    const [open2, setOpen2] = useState(false); //alert
  

    const [userData, setUserData] = useState(null); //accept data

    

    const [message, setMessage] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const { address } = useAccount();


    const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen2(false);
      };
    


      //Getting user data to whom withdrawal is getting accepted            
        //localstorage get access token
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
              .then(data => setUserData(data));
              
        
        }, []);




    //------------------------------------------------------------------------------------------

    async function acceptWithdraw(e) {
      e.preventDefault();
  
      try {

           //localstorage get access token
            const local_access_token = localStorage.getItem('access_token');
            const access_token = JSON.parse(local_access_token)

            //Update teller status 
            
            var postData = {
              requests: [
                {
                  wallet: address
                }
              ]
            };


            let axiosConfig = {
              headers: {
                  'Content-Type': 'application/json;charset=UTF-8',
                  "Access-Control-Allow-Origin": "*",
                  'Authorization': `Bearer ${access_token.token}`,
                  "x-auth-id": userData && userData._id,
              }
            };


            axios.put('http://localhost:5000/api/users/me', postData, axiosConfig)
              .then((res) => {
                console.log("Accept withdraw accepted successfully!");
                window.location.reload();
              })
              .catch((err) => {
                console.log("Acceptance unsuccessful");
              })



          setAlertMessage('');
  
          setMessage('Accepted successfully!');
         
          setOpen2(true);
  
      } catch (e) {
       
        setAlertMessage('Oops, something went wrong!');
        setOpen2(true);
      }
    }




    //--------------Reject----------------------------------------------------------------------------

    async function rejectWithdraw(e) {
      e.preventDefault();
  
      try {


           //localstorage get access token
            const local_access_token = localStorage.getItem('access_token');
            const access_token = JSON.parse(local_access_token)

            //Update teller status 
            
            var postData = {
              requests: []
            };


            let axiosConfig = {
              headers: {
                  'Content-Type': 'application/json;charset=UTF-8',
                  "Access-Control-Allow-Origin": "*",
                  'Authorization': `Bearer ${access_token.token}`,
                  "x-auth-id": userData && userData._id,
              }
            };


            axios.put('http://localhost:5000/api/users/me', postData, axiosConfig)
              .then((res) => {
                console.log("Accept withdraw accepted successfully!");
                window.location.reload();
              })
              .catch((err) => {
                console.log("Acceptance unsuccessful");
              })



          setAlertMessage('');
  
          setMessage('Accepted successfully!');
          setOpen2(true);
  
      } catch (e) {
     
        setAlertMessage('Oops, something went wrong!');
        setOpen2(true);
      }
    }





  return (
    <>


        {userData && userData.requests.map((item) => (
          <>
            {item.wallet === address ? 
            <>
              <Button variant="contained" color="error" onClick={rejectWithdraw}>
               Reject
            </Button>
            </> 
            : 
            <>
            <Button variant="contained" onClick={acceptWithdraw}>
                Accept
              </Button>
                        
            </>}
          </>
        ))}


        {userData && userData.requests.length === 0 ? 
        <>
          <Button variant="contained" onClick={acceptWithdraw}>
              Accept
          </Button>
        </> : null}





      

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
};

export default AcceptWithdraw;
