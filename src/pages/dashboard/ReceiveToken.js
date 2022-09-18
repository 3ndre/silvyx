import React, { useState } from "react";
import Iconify from "../../components/Iconify";
import {
  useAccount,
} from 'wagmi'

import QRCode from "react-qr-code";

//---------------Mui Dialog -----------------
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";


import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {Stack} from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
//-------------------------------------------


//---------------------------------------------------------



const ReceiveToken = () => {

  


    const [open, setOpen] = useState(false);
    const [copy, setCopy] = useState("Copy");
  


    const { address } = useAccount()



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const clipboard = () => {
    navigator.clipboard.writeText(address)
    setCopy("Copied!")
    setInterval(() => setCopy("Copy"), 2500)
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
         <Iconify icon="carbon:qr-code" size="25px" style={{ marginRight: '3px'}}/> Receive 
        </DialogTitle>

        <DialogContent>

    
        <Stack sx={{ p: 2 }}>


    

    
    <QRCode
    
    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
    value={address}
    viewBox={`0 0 256 256`}
    />

     
    </Stack>

        </DialogContent>
        <DialogActions>

         
          <>
          <Button variant="outlined" color="inherit" onClick={handleClose} >
          Cancel
        </Button>

        <Tooltip title={`${address}`} placement="top">
        <Button variant="outlined" disabled={copy === 'Copied!' ? true : false} autoFocus onClick={clipboard}>
           {copy}
          </Button>
        </Tooltip>
          </>
         


        </DialogActions>
      </Dialog>


    

      <Button variant="contained" onClick={handleClickOpen}>
              Receive
            </Button>
    </>
  );
};

export default ReceiveToken;
