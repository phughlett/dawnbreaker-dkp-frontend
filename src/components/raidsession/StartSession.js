import { useState, useContext } from "react";
import AppContext from '../../contexts/AppContext';
import {Button, TextField} from "@mui/material";

export default function StartSession() {

  const [sessionData, setSessionData] = useState({});
  const [instanceName, setInstanceName] = useState("");
  let {API} = useContext(AppContext);

  function initializeSession(sessionData, instanceName) {
    let body = { sessionData, action: "CREATE", sessionName: "new" };

    body = JSON.stringify(body);
    fetch(`${API}/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  }
  return (
    <>
      <TextField
        onChange={(e) => setInstanceName(e.target.value)}
        label={"Instance"}
      />
      <TextField
        onChange={(e) => setSessionData(e.target.value)}
        variant="outlined"
        label={"Start/Stop Session"}
      />
      <Button onClick={() => initializeSession(sessionData)} variant="outlined">
        Start Session
      </Button>
    </>
  );
}
