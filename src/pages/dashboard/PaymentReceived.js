import React, { useState } from "react";
import axios from 'axios';
import { useAccount } from 'wagmi';

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



const PaymentReceived = ({tellerAddress, userId, conversationId}) => {


  
    const { address } = useAccount()

    const [open2, setOpen2] = useState(false); //alert
    const [withdrawReceived, setWithdrawReceived] = useState(false); //withdraw cancellation loading

    

    const [message, setMessage] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    


    
  const [fetched, setFetched] = useState(false);
  const [transactionData, setTransactionData] = useState(null);


  

  async function getAllTransactionByAddress() {

    const ethers = require("ethers");
    //After adding Hardhat network, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(ABIS.address, ABIS.abi, signer)


    //get all transaction position of the user
    let transactionPosition = await contract.getWithdrawPositionIdsForAddress(address)



    //get all transaction done by the user
    let allTransactionByAddress = await Promise.all(transactionPosition.map(async i => {

      let transaction = await contract.getWithdrawPositionById(i);
      
      let formattedTranscation =  {
        withdrawId: parseInt(transaction.withdrawId),
        walletAddress: transaction.walletAddress,
        timestamp: parseInt(transaction.createdDate),
        withdrawAmount: parseInt(transaction.withdrawAmount)/1000000000000000000,
        withdrawStatus: transaction.withdrawOpen
      }

      return formattedTranscation
    }))

    const filtered = allTransactionByAddress.filter(n => n.withdrawStatus === true); //filtering array with status true


    setFetched(true);
    setTransactionData(filtered);
   
}

    

   

  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen2(false);
  };




  if(!fetched)
  getAllTransactionByAddress();



  
    async function receivedWithdraw(e) {
      e.preventDefault();
  
      try {

          setWithdrawReceived(true);

          const ethers = require("ethers");

          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
  
          let contract = new ethers.Contract(ABIS.address, ABIS.abi, signer);

         
          let receiveWithdraw = await contract.confirmRecieved(transactionData[0].withdrawId, tellerAddress.toString())
          await receiveWithdraw.wait();


          //localstorage get access token
          const local_access_token = localStorage.getItem('access_token');
          const access_token = JSON.parse(local_access_token)

          //Update accepted and requested status
          
          var postData = {
            accepted: [],
            requests: []
          }


          let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                'Authorization': `Bearer ${access_token.token}`,
                "x-auth-id": userId && userId,
            }
          };


          axios.put('http://localhost:5000/api/users/me', postData, axiosConfig)
            .then((res) => {
                console.log("Accept and request wallet updated successfully!");
            })
            .catch((err) => {
                console.log("Wallet acceptance and request unsuccessful");
            })



            //Update conversation status
          
          var postData2 = {
            status: false
          }


          let axiosConfig2 = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                'Authorization': `Bearer ${access_token.token}`,
                "x-auth-id": conversationId && conversationId,
            }
          };


          axios.put('http://localhost:5000/api/conversations', postData2, axiosConfig2)
            .then((res) => {
                console.log("Accept and request wallet updated successfully!");
            })
            .catch((err) => {
                console.log("Wallet acceptance and request unsuccessful");
            })



            

          setAlertMessage('');
  
          setMessage('Withdraw confirmed successfully!');
          setWithdrawReceived(false);
          setOpen2(true);
          window.location.reload();
  
      } catch (e) {
        console.log(e)
        setWithdrawReceived(false);
        setAlertMessage('Oops, withdraw confirmation unsuccessfull!');
        setOpen2(true);
      }
    }





  return (
    <>




    


    
        {withdrawReceived === false ? 
        <Button variant="contained" onClick={receivedWithdraw} >
          Received
        </Button>
        :

        <Button variant="contained" disabled>
            Releasing...
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

export default PaymentReceived;
