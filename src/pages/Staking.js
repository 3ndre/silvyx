import React, { useState } from "react";
import { useAccount, useNetwork } from 'wagmi';
import { Navigate } from 'react-router-dom';
import moment from 'moment';
// @mui
import {
    Box,
    Card,
    Table,
    Divider,
    TableBody,
    Container,
    TableContainer,
    Typography,
    TableRow, TableCell, TableHead,  
  } from '@mui/material';

import Scrollbar from '../components/Scrollbar';

// hooks
import useSettings from '../hooks/useSettings';
// components 
import Page from '../components/Page';

import SwitchNetwork from './authentication/SwitchNetwork';
import StakeToken from "./dashboard/StakeToken";
import ABIS from '../abis/abis.json';
import CancelStake from "./dashboard/CancelStake";
// ----------------------------------------------------------------------

export default function Teller() {
  const { themeStretch } = useSettings();

  const { isConnected, address } = useAccount()

  const { chain } = useNetwork()

 


  

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
    let stakingPosition = await contract.getPositionIdsForAddress(address)

    //get all transaction done by the user
    let allTransactionByAddress = await Promise.all(stakingPosition.map(async i => {

      let transaction = await contract.getPositionById(i);

      
      let formattedTranscation =  {
        stakingId: parseInt(transaction.positionId),
        walletAddress: transaction.walletAddress,
        lockdate: parseInt(transaction.createdDate),
        unlockdate: parseInt(transaction.unlockDate),
        stakedAmount: parseInt(transaction.weiStaked)/1000000000000000000,
        stakedInterest: parseInt(transaction.weiInterest)/1000000000000000000,
        status: transaction.open
      }

      return formattedTranscation
    }))

    const filtered = allTransactionByAddress.filter(n => n.status === true); //filtering array with status true

    setFetched(true);
    setTransactionData(filtered);
   
}



if(!fetched)
    getAllTransactionByAddress();



  //------------------------------------------------

  if (!isConnected) {
    return <Navigate to="/connect" />;
  }

  return (
    <Page title="Staking">
      <Container maxWidth={themeStretch ? false : 'xl'}>


      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>

      <Typography variant="h3" component="h1" paragraph>
          Staking
        </Typography>

        </Box>

        <Box sx={{ flexShrink: 0 }}><StakeToken/></Box>

        </Box>

        <br></br>
    


        {transactionData === null ? <>Loading...</> :
<Card>
         

          <Divider />

         

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative', mt: '13px'}}>
             

              <Table >
               
              <TableHead>
              
                    <TableRow>

                        <TableCell>
                          Staked amount
                        </TableCell>

                        <TableCell>
                          Earnings
                        </TableCell>

                        <TableCell>
                          Staked date
                        </TableCell>

                        <TableCell>
                          Unlock date
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

                          {item.stakedAmount} Matic

                          </TableCell>
                          

                          <TableCell align="left" >

                          {item.stakedInterest} Matic
                              
                          </TableCell>

                          <TableCell align="left">{moment.unix(item.lockdate).format("MMM Do YY")}</TableCell>

                          <TableCell align="left">{moment.unix(item.unlockdate).format("MMM Do YY")}</TableCell>


                          <TableCell align="left">
                            <CancelStake stakingId={item.stakingId}/>
                          
                          </TableCell>

                       
                     </TableRow>
                    ))}


                 
               
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

        
        </Card>

  }
        
        

        



      {chain.id !== 80001 ? <SwitchNetwork/> : null}



      </Container>
    </Page>
  );
}
