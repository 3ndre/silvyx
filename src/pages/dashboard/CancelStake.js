import React, { useState } from "react";

//---------------Mui Dialog -----------------
import Button from "@mui/material/Button";
import {Stack} from "@mui/material";

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



const CancelStake = ({stakingId}) => {

  
    const [open2, setOpen2] = useState(false); //alert
    const [stakeCancel, setStakeCancel] = useState(false); //withdraw cancellation loading

    

    const [message, setMessage] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const ethers = require("ethers");

    

    async function cancelStake(e) {
      e.preventDefault();
  
      try {

          setStakeCancel(true);
       
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
  
          let contract = new ethers.Contract(ABIS.address, ABIS.abi, signer);
  
          let cancelStake = await contract.closePosition(stakingId)
          await cancelStake.wait();

          

          setAlertMessage('');
  
          setMessage('Cancelled successfully!');
          setStakeCancel(false);
          setOpen2(true);
          window.location.reload();
      } catch (e) {
        setStakeCancel(false);
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




    


    
        {stakeCancel === false ? 
        <Button variant="contained" onClick={cancelStake} color="error">
          Cancel
        </Button>
        :

        <Button variant="contained" disabled color="error">
            Cancelling...
        </Button>
        
        }


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

export default CancelStake;
