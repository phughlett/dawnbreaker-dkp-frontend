import { useState, useContext } from "react";
import AppContext from '../../contexts/AppContext';
import {Button, TextField, Stack, Typography} from "@mui/material";

export default function AddRaidTeam() {

  const [newTeamName, setNewTeamName] = useState('')
  let {API, setSession, setSessionOptions} = useContext(AppContext);


  function submitNewRaidTeam(newTeamName){
    let body = { newTeamName};

    body = JSON.stringify(body);
    console.log(body)
    fetch(`${API}/raidteam`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then(() => setNewTeamName(''))
      .catch((err) => console.log(err));


  }


  return (
    <Stack spacing={0.5}>
      <Typography variant="h5">Create new Raid Team</Typography>
      <TextField
        onChange={(e) => setNewTeamName(e.target.value)}
        label={"Raid Team Name"}
        value={newTeamName}
      />
      <Button onClick={() => submitNewRaidTeam(newTeamName)} variant="outlined">
        Submit
      </Button>
    </Stack>
  );
}
