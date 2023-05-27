import {useEffect, useContext} from 'react';
import SessionTable from '../components/raidsession/SessionTable'
import StartSession from '../components/raidsession/StartSession'
import AddonInit from '../components/addonInit/AddonInit'
import AppContext from '../contexts/AppContext';
import NavBar from '../components/appbar/NavBar'
import { Box, Grid } from "@mui/material";

export default function SessionList(){

  let {sessionOptions, getActiveSessions, navigate} = useContext(AppContext);

  useEffect(()=>{
    getActiveSessions();
  },[])



  return(
    <Box>
    <NavBar pageName={'Sessions'}/>
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <StartSession/>
      </Grid>
      <Grid item xs={8}>
        <AddonInit/>
      </Grid>
    </Grid>
    <SessionTable data={sessionOptions} navigate={navigate}/>
    </Box>
  )
}