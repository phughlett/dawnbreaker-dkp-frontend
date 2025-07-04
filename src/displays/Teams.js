import {useEffect, useContext} from 'react';
import RaidTeamTable from '../components/raidTeam/RaidTeamTable'
import AddRaidTeam from '../components/raidTeam/AddRaidTeam'
import AppContext from '../contexts/AppContext';
import { Link } from "react-router-dom";
import NavBar from '../components/appbar/NavBar'
import { Box, Grid , Typography} from "@mui/material";

export default function SessionList(){

  let {raidTeams, getRaidTeams, navigate} = useContext(AppContext);

  useEffect(()=>{
    getRaidTeams();
  },[raidTeams])



  return(
    <Box>
    <NavBar pageName={'Raid Teams'}/>
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <AddRaidTeam/>
      </Grid>
    </Grid>
    <RaidTeamTable data={raidTeams} navigate={navigate}/>
    </Box>
  )
}