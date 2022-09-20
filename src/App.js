import logo from "./logo.svg";
import "./App.css";
import { Box, Grid, Stack, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

function App() {
  const API = 'http://localhost:8080'

  const [sessionData, setSessionData] = useState({});
  const [copyState, setCopyState] = useState("");
  const [addonInit, setAddonInit] = useState("");
  const [instanceName, setInstanceName] = useState("");
  const [activeSession, setActiveSession] = useState([]);




  function getInitString(){

    fetch(`${API}/session/addoninit`,{
      method: "GET"
    })
    .then(response => response.json())
    .then(data => setAddonInit(data))
    .catch(err => console.log(err))
  }

  function getActiveSessions(){

    fetch(`http://localhost:8080/session`,{
      method: "GET"
    })
    .then((response) => response.json())
    .then((data) => setActiveSession(data))
    .catch((err) => console.log(err))
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
        setAddonInit(data);
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
        setAddonInit(data);
      })
      .catch((err) => console.log(err));
  }

  function copyText(e) {
    navigator.clipboard.writeText(e.target.value);
    setCopyState("Copied to Clipboard!");
    setTimeout(() => setCopyState(""), 5000);
  }

  return (
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
            <TextField
              disabled
              onClick={(e) => copyText(e)}
              label={"Click to Copy"}
              value={addonInit}
            />
            <Button onClick={() => getInitString()}>Update AddonInit String</Button>
            <Typography variant="caption">{copyState}</Typography>
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
      <Typography variant="body1">{activeSession.map(session => session.name)}</Typography>
      <Button onClick={() => getActiveSessions()}>Get Active Sessions</Button>
    </Box>
  );
}

export default App;
