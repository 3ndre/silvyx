import React, {useEffect} from 'react';
import { useAccount, useDisconnect } from 'wagmi'
import { Box, Typography, Button} from '@mui/material';

export default function Authorize() {
  

  const { address } = useAccount();


  const { disconnect } = useDisconnect()


  function disconnected () {
    disconnect()
    localStorage.clear();
  }



  const authencticate = async () => {
    let header = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    let res = await fetch(`http://localhost:5000/api/auth/nonce?address=${address}`, header) //getting nonce from the backend
    let resBody = await res.json();

    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    let signature = await signer.signMessage(resBody.message)
    
    let opts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resBody.tempToken}`
        }
    }

    res = await fetch(`http://localhost:5000/api/auth/verify?signature=${signature}`, opts)
    resBody = await res.json();

    //local storage remove 24hrs
    var now = new Date().getTime();
    const item = {
      token: resBody.token,
      expiry: now,
    }
    localStorage.setItem('access_token', JSON.stringify(item));

    window.location.reload();
}



useEffect(() => {
    authencticate()
}, []);

  return (
    <>

    {localStorage.getItem('access_token') === null ? 
      
      <Box sx={{ maxWidth: 480, mx: 'auto', textAlign: 'center' }}>

            
               
                    <>
                    <Typography variant="h3" paragraph>
                    Communicating with wallet
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                    Sign message with your wallet
                  </Typography>

          
                </>
             
     
        <>
         <Button variant="contained" onClick={disconnected} style={{background: 'gray', color: 'white'}}>
          Disconnect
        </Button>
        <br></br>
         
       
        </>
   
  
           
          </Box>
    : null}
    </>
  );
}
