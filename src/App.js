import logo from "./DB_LOGO.svg";
import "./App.css";
import { Box, Grid, Stack, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import {AddonInit} from './components/addonInit/AddonInit';
import AppContext from './contexts/AppContext';
import StartSession from './components/raidsession/StartSession'
import AddItem from './components/raidsession/AddItem'
import StopSession from './components/raidsession/StopSession'

function App() {
  const API = 'http://localhost:8080'
  const PROD ="http://52.20.246.180:8080";

  const [activeSession, setActiveSession] = useState([]);

  function getActiveSessions() {
    fetch(`${API}/session`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setActiveSession(data))
      .catch((err) => console.log(err));
  }





  let contextObj = {
    API

  }

  return (
    <AppContext.Provider value={contextObj}>
    <Box sx={{ margin: "5rem" }}>

      <Grid container spacing={2}>
        <Grid item xs={12} xl={12}><Box sx={{width:400,height:200, margin:'auto'}}><img src={logo} alt="Dawnbreaker" /></Box></Grid>
        <Grid item xs={4}>
          <Stack spacing={1.5}>
            <StartSession/>
            <AddonInit/>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={1.5}>
          <AddItem/>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={1.5}>
          <StopSession/>
          </Stack>
        </Grid>
      </Grid>
      <Typography variant="body1">
        {activeSession.map((session) => session.name)}
      </Typography>
      <Button onClick={() => getActiveSessions()}>Get Active Sessions</Button>
    </Box>
    </AppContext.Provider>
  );
}

export default App;
