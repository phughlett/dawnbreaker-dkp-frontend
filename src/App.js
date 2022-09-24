import logo from "./logo.svg";
import "./App.css";
import { Box, Grid, Stack, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import {AddonInit} from './components/addonInit/AddonInit';
import AppContext from './contexts/AppContext';

function App() {
  const API = process.env.API ||"http://127.0.0.1:8080";

  const [sessionData, setSessionData] = useState({});


  const [instanceName, setInstanceName] = useState("");
  const [activeSession, setActiveSession] = useState([]);

  function getActiveSessions() {
    fetch(`http://localhost:8080/session`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setActiveSession(data))
      .catch((err) => console.log(err));
  }

  function initializeSession(sessionData, instanceName) {
    let body = { sessionData, action: "CREATE", sessionName: "new" };

    body = JSON.stringify(body);
    fetch(`http://localhost:8080/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((response) => response.json())
      .then((data) => {

      })
      .catch((err) => console.log(err));
  }

  function endSession(sessionName = "new") {
    let body = { action: "CLOSE", sessionName };

    body = JSON.stringify(body);
    fetch(`http://localhost:8080/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((response) => response.json())
      .then((data) => {
      })
      .catch((err) => console.log(err));
  }

  let contextObj = {
    API

  }

  return (
    <AppContext.Provider value={contextObj}>
    <Box sx={{ margin: "5rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Stack spacing={1.5}>
            <TextField
              onChange={(e) => setInstanceName(e.target.value)}
              label={"Instance"}
            />
            <TextField
              onChange={(e) => setSessionData(e.target.value)}
              variant="outlined"
              label={"Start/Stop Session"}
            />
            <Button
              onClick={() => initializeSession(sessionData)}
              variant="outlined"
            >
              Start Session
            </Button>
            <AddonInit/>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={1.5}>
            <TextField variant="outlined" label={"Add Item to Session"} />
            <Button variant="outlined">Add Item</Button>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={1.5}>
            <TextField variant="outlined" label={"Session Name"} />
            <Button onClick={() => endSession()} variant="outlined">
              Stop Session
            </Button>
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
