import React, { useState, useEffect } from "react";
import { useAccount } from 'wagmi';


//---------------Mui Dialog -----------------
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";


import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, Stack } from "@mui/material";
import TextField from '@mui/material/TextField';
//-------------------------------------------

//mui alert
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


//smart contract

import ABIS from '../../abis/abis.json';

//---------------------------------------------------------



//global variables
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const WithdrawToken = () => {

  


    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false); //alert
    const [withdrawLoad, setWithdrawLoad] = useState(false); //withdraw loading

    const [formParams, updateFormParams] = useState({ amount: ''});

    const [message, setMessage] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const ethers = require("ethers");

    const { address } = useAccount()



    const [userData, setUserData] = useState(null);


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
      
        fetch('http://localhost:5000/api/users/me', header)
            .then(response => response.json())
            .then(data => setUserData(data));
            
      
      }, []);

    

    async function withdrawToken(e) {
      e.preventDefault();
  
      try {

          setWithdrawLoad(true);
       
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
  
          let contract = new ethers.Contract(ABIS.address, ABIS.abi, signer);
  
          const amounts = ethers.utils.parseUnits(formParams.amount, 'ether');
         
  
          let withdraw = await contract.withdrawAmount({value: amounts});
          await withdraw.wait();

          setAlertMessage('');
  
          setMessage('Withdraw request listed successfully!');
          setWithdrawLoad(false);
          updateFormParams({ amount: ''});
          setOpen(false);
          setOpen2(true);
  
      } catch (e) {
        setOpen(false);
        setWithdrawLoad(false);
        updateFormParams({ amount: ''});
        setAlertMessage('Oops, transaction failed!');
        setOpen2(true);
      }
    }


   


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    updateFormParams({ amount: ''});
    setOpen(false);
  };

  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen2(false);
  };





  return (
    <>




      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        
         <DialogTitle id="alert-dialog-title" >
          {"Withdraw"}
        </DialogTitle>

        <DialogContent>

    
        <Stack sx={{ p: 2 }}>



      
                <form id="send-token"  onSubmit={withdrawToken}>
            <Grid container spacing={1} >


                <Grid item xs={12}>
                    <TextField type="number" placeholder="0.05" name="amount" label="Amount (matic)" fullWidth required autoComplete='off' value={formParams.amount} onChange={e => updateFormParams({...formParams, amount: e.target.value})} />
                </Grid>


              

                </Grid>

            </form>
     
    </Stack>

        </DialogContent>
        <DialogActions>

         
          <>
          <Button variant="outlined" color="inherit" onClick={handleClose} >
          Cancel
        </Button>

        {withdrawLoad === true ? 
          <Button type="submit" variant="contained" disabled autoFocus>
            Withdrawing...
          </Button>
          : userData && userData.accepted.length > 0 ?
          <Button disabled variant="contained" autoFocus >
            Disabled
          </Button>
          :
          <Button type="submit" form="send-token" variant="contained" autoFocus >
           Withdraw
          </Button>
        }
          </>
         


        </DialogActions>
      </Dialog>


    

        <Button variant="contained" onClick={handleClickOpen}>
          Withdraw
        </Button>


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

export default WithdrawToken;
