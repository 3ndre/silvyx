import { useAccount } from 'wagmi'
// import { useState, useEffect } from 'react';

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
  Typography,
  TableRow, TableCell, TableHead,  
} from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Scrollbar from '../../components/Scrollbar';

// ----------------------------------------------------------------------


export default function AvailableTellers({userData}) {
  const { themeStretch } = useSettings();

  const { isConnected } = useAccount()
  


if (!isConnected) {
      return <Navigate to="/connect" />;
    }
  



  return (
   
      <Container maxWidth={themeStretch ? false : 'xl'}>

        <Typography variant="body1" style={{color: 'gray'}} component="p" gutterBottom>
          (Choose any one of the teller to cashout)
        </Typography>



        {userData === null ? <>Loading...</> :
    
    
    <Card>
         

          <Divider />

         

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative', mt: '13px'}}>
             

              <Table >
               
              <TableHead>
              
                    <TableRow>

                        <TableCell>
                          Teller address
                        </TableCell>

                        <TableCell>
                          Action
                        </TableCell>
     
                    </TableRow>

                   

                  </TableHead>

                      <TableBody>

                          
                     
                      {userData && userData.requests.map((item) => (
                     
                        <TableRow hover key={item.wallet}>

                          <TableCell align="left" >

                          {item.wallet.substring(0, 15)}...

                          </TableCell>


                          <TableCell align="left">
                            <Button variant="contained">Choose</Button>
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
