import logo from "./logo.svg";
import "./App.css";
import { Box, Grid, Stack, Button, TextField, Typography} from "@mui/material";
import {useState} from 'react'

function App() {

  const [sessionData, setSessionData] = useState({})
  const [copyState, setCopyState] = useState('');
  const [addonInit, setAddonInit] = useState('')


  function initializeSession(sessionData) {
    let body = {sessionData, action: 'CREATE'};

    body = JSON.stringify(body);
    fetch(`http://localhost:8080/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })

  }

  function copyText(e){
    navigator.clipboard.writeText(e.target.value)
    setCopyState('Copied to Clipboard!');
    setTimeout(() => setCopyState(''), 5000)
  }

  return (
    <Box sx={{ margin: "5rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
            <Stack spacing={1.5}>
              <TextField onChange={(e) => setSessionData(e.target.value)} variant="outlined" label={"Start/Stop Session"} />
              <Button onClick={() => initializeSession(sessionData)} variant="outlined">Start Session</Button>
              <TextField disabled onClick={(e) => copyText(e)} label={"Click to Copy"} value={addonInit} />
              <Typography variant='caption'>{copyState}</Typography>
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
            <TextField variant="outlined" label={"Initialize Session"} />
            <Button variant="outlined">Start Session</Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
