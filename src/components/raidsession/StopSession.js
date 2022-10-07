import { useContext } from "react";
import AppContext from '../../contexts/AppContext';
import {Button} from "@mui/material"
import SessionSelect from './SessionSelect'

export default function StopSession() {
  let {API, session, setSession, navigate} = useContext(AppContext);


  function endSession(sessionName = session) {
    let body = { action: "CLOSE", sessionName };

    body = JSON.stringify(body);
    fetch(`${API}/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((response) => {
        response.json()

      })
      .catch((err) => console.log(err));
    setSession('')
    navigate("/")
  }
  return (
    <>
      <SessionSelect/>
      <Button onClick={() => endSession()} variant="outlined">
        Stop Session
      </Button>
    </>
  );
}
