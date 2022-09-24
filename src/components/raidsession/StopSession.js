import { useContext } from "react";
import AppContext from '../../contexts/AppContext';
import {Button, TextField} from "@mui/material"

export default function StopSession() {
  let {API} = useContext(AppContext);


  function endSession(sessionName = "new") {
    let body = { action: "CLOSE", sessionName };

    body = JSON.stringify(body);
    fetch(`${API}/session`, {
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
  return (
    <>
      <TextField variant="outlined" label={"Session Name"} />
      <Button onClick={() => endSession()} variant="outlined">
        Stop Session
      </Button>
    </>
  );
}
