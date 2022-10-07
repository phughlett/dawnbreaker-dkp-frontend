import {useEffect, useContext} from 'react';
import SessionTable from '../components/raidsession/SessionTable'
import StartSession from '../components/raidsession/StartSession'
import AddRaidTeam from '../components/raidTeam/AddRaidTeam'
import AddonInit from '../components/addonInit/AddonInit'
import AppContext from '../contexts/AppContext';
import { Link } from "react-router-dom";

import { Box, Grid } from "@mui/material";

export default function SessionList(){

  let {sessionOptions, getActiveSessions, navigate} = useContext(AppContext);

  useEffect(()=>{
    getActiveSessions();
  },[])



  return(
    <Box sx={{ margin: "5rem" }}>
      <li><Link to={'/ledger'}>Ledger</Link></li>
      <li><Link style={{leftMargin:'5rem'}} to={'/characters'}>Characters</Link></li>
    <h1>Sessions</h1>
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <StartSession/>
      </Grid>
      <Grid item xs={4}>
        <AddRaidTeam/>
      </Grid>
      <Grid item xs={4}>
        <AddonInit/>
      </Grid>

    </Grid>

    <SessionTable data={sessionOptions} navigate={navigate}/>
    </Box>
  )
}