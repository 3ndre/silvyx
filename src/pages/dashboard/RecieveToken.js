import React, { useState } from "react";
import {
  useAccount,
} from 'wagmi'

//---------------Mui Dialog -----------------
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";


import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {Stack} from "@mui/material";

//-------------------------------------------


//---------------------------------------------------------



const RecieveToken = () => {

  


    const [open, setOpen] = useState(false);
  


    const { address } = useAccount()



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          {"My address"}
        </DialogTitle>

        <DialogContent>

    
        <Stack sx={{ p: 2 }}>


    <h5>{address}</h5>
      
     
    </Stack>

        </DialogContent>
        <DialogActions>

         
          <>
          <Button variant="outlined" color="inherit" onClick={handleClose} >
          Cancel
        </Button>

        <Button  variant="contained" autoFocus>
           Copy
          </Button>

          </>
         


        </DialogActions>
      </Dialog>


    

      <Button variant="contained" onClick={handleClickOpen}>
              Recieve
            </Button>
    </>
  );
};

export default RecieveToken;
