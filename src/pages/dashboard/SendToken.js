import React, { useState } from "react";
import { useDebounce } from 'use-debounce'
import {
  useAccount,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from 'wagmi'

//---------------Mui Dialog -----------------
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";


import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {Grid,Typography, Stack} from "@mui/material";
import TextField from '@mui/material/TextField';
//-------------------------------------------

//mui alert
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


//---------------------------------------------------------

import Iconify from '../../components/Iconify';



//global variables
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const SendToken = () => {

  


    const [open, setOpen] = useState(false);
    const [, setOpen2] = useState(false); //alert
   



    const ethers = require("ethers");

    const { address } = useAccount()

  const [to, setTo] = React.useState('')
  const [debouncedTo] = useDebounce(to, 500)

  const [amount, setAmount] = React.useState('')
  const [debouncedAmount] = useDebounce(amount, 500)

  const { config } = usePrepareSendTransaction({
    request: {
      to: debouncedTo,
      value: debouncedAmount ? ethers.utils.parseEther(debouncedAmount) : undefined,
    },
  })
  const { data, sendTransaction } = useSendTransaction(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })



   


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setTo('');
    setAmount('');
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


{isSuccess && (
<Stack spacing={2} sx={{ width: '100%' }}>
    <Snackbar autoHideDuration={6000} onClose={handleClose2}>

    
       
        <Alert onClose={handleClose2} severity="success" sx={{ width: '100%', color: 'white' }}>
        Successfully sent {amount} matic to {to}
      </Alert>
     

    
    </Snackbar>
  </Stack>
 )}


      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
         <DialogTitle id="alert-dialog-title" >
          {"Send Token"}
        </DialogTitle>

        <DialogContent>

    
        <Grid style={{ maxWidth: 450, padding: "5px 5px", margin: "0 auto" }}>

        <Typography variant="body2" style={{color: 'white'}} component="p" gutterBottom>
          
          </Typography> 


      
                <form id="send-token"  onSubmit={(e) => {
        e.preventDefault()
        sendTransaction?.()
      }}>
            <Grid container spacing={1} style={{color: 'white', marginTop: '8px'}}>


                <Grid item xs={12}>
                    <TextField  onChange={(e) => setTo(e.target.value)} placeholder="0xA0Cf…251e" value={to} name="to" sx={{ input: { color: 'black', background: 'white' } }} InputLabelProps={{ style: { color: 'black' } }}  label="Address" variant="filled" fullWidth required autoComplete='off'/>
                </Grid>

                <Grid item xs={12}>
                    <TextField type="number" onChange={(e) => setAmount(e.target.value)} placeholder="0.05"
                   value={amount} name="amount" sx={{ input: { color: 'black', background: 'white' } }} InputLabelProps={{ style: { color: 'black' } }} label="Amount (matic)" variant="filled" fullWidth required autoComplete='off' />
                </Grid>


              

                </Grid>

            </form>
     
    </Grid>

        </DialogContent>
        <DialogActions>

         
          <>
          <Button onClick={handleClose} style={{color: 'white'}}>Cancel</Button>

          <Button type="submit" form="send-token" autoFocus disabled={isLoading || !sendTransaction || !to || !amount || to === address}>
          {isLoading ? 'Sending...' : 'Send'}
          </Button>
          </>
         


        </DialogActions>
      </Dialog>


    

      <Button variant="contained" startIcon={<Iconify icon="cryptocurrency:matic" />} onClick={handleClickOpen}>
              Send Token
            </Button>
    </>
  );
};

export default SendToken;
