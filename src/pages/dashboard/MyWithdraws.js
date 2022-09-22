import { useAccount } from 'wagmi'
import { useState } from 'react';

import moment from 'moment';
import { Navigate } from 'react-router-dom';
// @mui
import {
  Card,
  Table,
  Divider,
  Button,
  TableBody,
  Container,
  TableContainer,
  TableRow, TableCell, TableHead,  
} from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Scrollbar from '../../components/Scrollbar';
import SkeletonItem from "../../components/SkeletonItem";
// ----------------------------------------------------------------------

//smart contract

import ABIS from '../../abis/abis.json';
import CancelWithdraw from '../dashboard/CancelWithdraw';

export default function MyWithdraws({userData}) {
  const { themeStretch } = useSettings();

  const { isConnected, address } = useAccount()



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





if(!fetched)
    getAllTransactionByAddress();


if (!isConnected) {
      return <Navigate to="/connect" />;
    }
  



  return (
    
      <Container maxWidth={themeStretch ? false : 'xl'}>
       


        {transactionData === null ? <SkeletonItem/> :
<Card>
         

          <Divider />

         

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative', mt: '13px'}}>
             

              <Table >
               
              <TableHead>
              
                    <TableRow>

                        <TableCell>
                          Wallet address
                        </TableCell>

                        <TableCell>
                          Date
                        </TableCell>

                        <TableCell>
                          Amount
                        </TableCell>

                        <TableCell>
                          Status
                        </TableCell>

                        <TableCell>
                          Action
                        </TableCell>
     
                    </TableRow>

                   

                  </TableHead>

                      <TableBody>

                          
                     
                      {transactionData && transactionData.reverse().map((item) => (
                     
                        <TableRow hover key={item.withdrawId}>

                          <TableCell align="left" >

                          {item.walletAddress.substring(0, 12)}...

                          </TableCell>
                          

                          <TableCell align="left" >

                              {moment.unix(item.timestamp).format("MMM Do YY")}
                              
                          </TableCell>

                          <TableCell align="left">{item.withdrawAmount} Matic</TableCell>

                          <TableCell align="left">{item.withdrawStatus === false ? "Closed" : "Open"}</TableCell>


                          <TableCell align="left">
                            {item.walletAddress === address && item.withdrawStatus === false ?
                            <Button variant="contained" disabled >Closed</Button>
                            : userData && userData.accepted.length > 0 ? 
                            <Button variant="contained" disabled>Processing</Button>
                            : item.walletAddress === address && item.withdrawStatus === true ?  
                            <CancelWithdraw withdrawId={item.withdrawId} userId={userData && userData._id}/>
                            : <Button variant="contained" >Accept</Button>
                          }
                          </TableCell>

                       
                     </TableRow>
                    ))}


                 
               
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

        
        </Card>

  }
        
        
      </Container>
  
  );
}
