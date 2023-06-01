import { useState, useContext } from "react";
import AppContext from '../../contexts/AppContext';
import {Button, TextField, Stack} from "@mui/material";

export default function AddRaidTeam() {

  const [newTeamName, setNewTeamName] = useState('')
  let {API} = useContext(AppContext);


  function submitNewRaidTeam(newTeamName){
    let body = { newTeamName};

    body = JSON.stringify(body);
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
      <TextField
        onChange={(e) => setNewTeamName(e.target.value)}
        label={"Create new Raid Team"}
        value={newTeamName}
      />
      <Button onClick={() => submitNewRaidTeam(newTeamName)} variant="outlined">
        Submit
      </Button>
    </Stack>
  );
}
