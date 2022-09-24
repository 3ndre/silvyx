import { useAccount, useNetwork } from 'wagmi';

import { useState } from 'react';
import { Navigate } from 'react-router-dom';
// @mui
import { Container, Grid } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components 
import Page from '../components/Page';

import SwitchNetwork from './authentication/SwitchNetwork';
import SendReceive from '../components/sections/SendReceive';
import Balance from '../components/sections/Balance';
import RoutesCard from '../components/sections/RoutesCard';
import ABIS from '../abis/abis.json';
// ----------------------------------------------------------------------

export default function Dashboard() {
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
      let transactionPosition = await contract.getWithdrawPositionIdsForAddress(address)

      //get all transaction done by the user
      let allTransactionByAddress = await Promise.all(transactionPosition.map(async i => {

        let transaction = await contract.getWithdrawPositionById(i);

        
        
        

        return parseInt(transaction.withdrawAmount)/1000000000000000000
      }))

    

      setFetched(true);
      setTransactionData(allTransactionByAddress);
    
  }



  if(!fetched)
      getAllTransactionByAddress();


      

  if (!isConnected) {
    return <Navigate to="/connect" />;
  }

  return (
    <Page title="Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>

      {chain.id !== 80001 ? <SwitchNetwork/> : null}


      <Grid container spacing={3}>

          <Grid item xs={12} md={8}>
            <SendReceive />
          </Grid>

          <Grid item xs={12} md={4}>
            <Balance transactionData={transactionData && transactionData}/>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <RoutesCard title="Staking" total={714000} icon={'ri:safe-2-line'} to="/staking" color="error"/>
          </Grid>


          <Grid item xs={12} sm={6} md={3}>
            <RoutesCard title="Transaction" total={714000} icon={'icon-park-outline:transaction-order'} to="/transaction" color="warning"/>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <RoutesCard title="Withdraw" total={714000} icon={'bx:money-withdraw'} to="/withdraw" color="primary"/>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <RoutesCard title="Chat" total={714000} icon={'akar-icons:chat-dots'} to="/chat" color="info"/>
          </Grid>
          
      </Grid>

      </Container>
    </Page>
  );
}
