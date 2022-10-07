import { useState, useContext } from "react";
import AppContext from '../../contexts/AppContext';
import {Button, TextField, Stack} from "@mui/material";

export default function StartSession() {

  const [sessionData, setSessionData] = useState({});
  const [instanceName, setInstanceName] = useState("");
  let {API, setSession, setSessionOptions} = useContext(AppContext);

  function initializeSession(sessionData, sessionName = instanceName) {
    let body = { sessionData, action: "CREATE", sessionName};

    body = JSON.stringify(body);
    console.log(body)
    fetch(`${API}/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((response) => response.json())
      .then((data) => {
        setSession(sessionName)
        setSessionOptions(data)
      })
      .catch((err) => console.log(err));
  }
  return (
    <Stack  spacing={.5}>
      <TextField
        onChange={(e) => setInstanceName(e.target.value)}
        label={"Session Name"}
      />
      <TextField
        onChange={(e) => setSessionData(e.target.value)}
        variant="outlined"
        label={"Start Init String"}
      />
      <Button onClick={() => initializeSession(sessionData)} variant="outlined">
        Start Session
      </Button>
    </Stack>
  );
}
