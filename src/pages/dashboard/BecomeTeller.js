import React, { useState, useEffect } from "react";



//---------------Mui Dialog -----------------
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";


import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {Grid,Stack,Typography} from "@mui/material";
import TextField from '@mui/material/TextField';
//-------------------------------------------

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


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



const BecomeTeller = () => {

  


    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false); //alert
    const [stakeLoad, setStakeLoad] = useState(false); //withdraw loading

    const [matic, setMatic] = useState(null);
    const [staked, setStaked] = useState(null);

    const [formParams, updateFormParams] = useState({ amount: '', days: ''});

    const [message, setMessage] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const ethers = require("ethers");

  

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



 
useEffect(() => {
  
  fetch('https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd')
      .then(response => response.json())
      .then(data => setMatic(data["matic-network"].usd));
      
  
  setStaked((Math.round((20 / 100) * (formParams.amount/matic) * 100) / 100).toFixed(2)) //converting $ to Matic and getting 20%

}, [formParams.amount, matic]);






async function stakeToken(e) {
  e.preventDefault();

  try {

      setStakeLoad(true);
   
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      let contract = new ethers.Contract(ABIS.address, ABIS.abi, signer);

      const amounts = ethers.utils.parseUnits(staked, 'ether');
     

      let stake = await contract.stakeToken(parseInt(formParams.days), {value: amounts});
      await stake.wait();

      setAlertMessage('');

      setMessage('Token staked successfully!');
      setStakeLoad(false);
      updateFormParams({ amount: ''});
      setOpen(false);
      setOpen2(true);

  } catch (e) {
    setOpen(false);
    setStakeLoad(false);
    updateFormParams({ amount: ''});
    setAlertMessage('Oops, transaction failed!');
    setOpen2(true);
  }
}


  return (
    <>




      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        
         <DialogTitle id="alert-dialog-title" >
          {"Stake token"}

          
    <Typography variant="body2" style={{color: 'white'}} component="p" gutterBottom>
              <span style={{color: 'gray'}}>(You need to stake 20% of the available amount you can transfer to a user!)</span>
          </Typography> 
          
  
        </DialogTitle>

        <DialogContent>

    
        <Stack sx={{ p: 2 }}>



      
                <form id="send-token"  onSubmit={stakeToken}>
            <Grid container spacing={1} >


                <Grid item xs={12}>
                    <TextField type="number" placeholder="$100" name="amount" label="Available amount" fullWidth required autoComplete='off' value={formParams.amount} onChange={e => updateFormParams({...formParams, amount: e.target.value})} />
                </Grid>

                <Grid item xs={12}>

                <FormControl fullWidth>
                  <InputLabel>Days to stake</InputLabel>
                  <Select
                    name="days"
                    label="Days to stake"
                    value={formParams.days ?? ""} 
                    onChange={e => updateFormParams({...formParams, days: e.target.value})}
                  >
                    <MenuItem value={4}>4 days</MenuItem>
                    <MenuItem value={7}>7 days</MenuItem>
                    <MenuItem value={10}>10 days</MenuItem>
                  </Select>
                </FormControl>

                </Grid>

                

                </Grid>

            </form>
     
    </Stack>


        </DialogContent>
        <DialogActions>

         
          <>
          <Button disabled>
          Stake: &nbsp;<span style={{color:'#00AB55'}}>{staked} MATIC</span>
          </Button>

          <div style={{flex: '1 0 0'}} />

          <Button variant="outlined" color="inherit" onClick={handleClose} >
          Cancel
        </Button>

        {stakeLoad === true ? 
          <Button type="submit" variant="contained" disabled autoFocus>
            Staking...
          </Button>
          :
          <Button type="submit" form="send-token" variant="contained" autoFocus >
           Stake
          </Button>
        }
          </>
         


        </DialogActions>
      </Dialog>


    

        <Button variant="contained" onClick={handleClickOpen}>
          Become a Teller
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

export default BecomeTeller;
