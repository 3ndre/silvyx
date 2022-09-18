import React, { useState } from "react";
import axios from 'axios';
import { useAccount } from 'wagmi';


//---------------Mui Dialog -----------------
import Button from "@mui/material/Button";
import {Stack} from "@mui/material";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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



const CancelTeller = ({id}) => {

  


    const [open2, setOpen2] = useState(false); //alert
    const [tellerCancel, setTellerCancel] = useState(false); //withdraw cancellation loading

    

    const [message, setMessage] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const ethers = require("ethers");
    const { address } = useAccount()


    //Dialog

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    

    async function cancelWithdraw(e) {
      e.preventDefault();
  
      try {

          setTellerCancel(true);
       
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
  
          let contract = new ethers.Contract(ABIS.address, ABIS.abi, signer);

          //get teller staked position
          let transactionPosition = await contract.getPositionIdsForAddress(address);

          //Mapping the position
          const allTransactionPosition = await Promise.all(transactionPosition.map(async i => {
            return i
          }))
    
          let finaltransactionPosition = allTransactionPosition.reverse(); //reversing the order to get the recent staked ID

          
          let tellerStakedPosition = parseInt(finaltransactionPosition[0]) 

         
          
          //closing the staked postition
          
          let cancelTeller = await contract.closePosition(tellerStakedPosition)
          await cancelTeller.wait();


           //localstorage get access token
            const local_access_token = localStorage.getItem('access_token');
            const access_token = JSON.parse(local_access_token)

            //Update teller status 
            
            var postData = {
              teller: false,
              tellerfund: null,
            };


            let axiosConfig = {
              headers: {
                  'Content-Type': 'application/json;charset=UTF-8',
                  "Access-Control-Allow-Origin": "*",
                  'Authorization': `Bearer ${access_token.token}`,
                  "x-auth-id": id,
              }
            };


            axios.put('http://localhost:5000/api/users/me', postData, axiosConfig)
              .then((res) => {
                console.log("Teller data updated successfully!");
                window.location.reload();
              })
              .catch((err) => {
                console.log("Update unsuccessful");
              })



          setAlertMessage('');
  
          setMessage('Teller position cancelled successfully!');
          setTellerCancel(false);
          setOpen2(true);
  
      } catch (e) {
        setTellerCancel(false);
        setAlertMessage('Oops, cancellation failed!');
        setOpen2(true);
      }
    }


   

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
      >
        <DialogTitle>
          {"Don't want to be a teller?"}
        </DialogTitle>

        <DialogContent style={{marginTop: '10px'}}>

          <DialogContentText >
            By doing so you will not be a teller anymore, you will get back your token with interest.
          </DialogContentText>

        </DialogContent>

        <DialogActions>
          <Button variant="outlined" color="inherit" onClick={handleClose}>Cancel</Button>
          {tellerCancel === false ? 
            <Button variant="contained" onClick={cancelWithdraw} color="error">
              Unstake
            </Button>
        :

            <Button variant="contained" disabled color="error">
                Unstaking...
            </Button>
        
        }
        </DialogActions>
      </Dialog>


    
        <Button variant="contained" onClick={handleClickOpen} color="error">Unstake</Button>

    
        

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

export default CancelTeller;
