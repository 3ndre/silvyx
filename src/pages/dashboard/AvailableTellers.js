import { useAccount } from 'wagmi'

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
import ChooseTeller from './ChooseTeller';

import SkeletonItem from "../../components/SkeletonItem";

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



        {userData === null ? <SkeletonItem/> :
    
    
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
                            {userData.accepted.length === 0 ? 
                              <ChooseTeller walletAddress={item.wallet} userData={userData}/>
                            : 
                              <Button disabled variant="contained">Choosed</Button>
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
