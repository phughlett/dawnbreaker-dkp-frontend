import { useState, useContext } from "react";
import AppContext from '../../contexts/AppContext'
import {Button, TextField, Typography, Stack } from "@mui/material";


export default function AddonInit(props) {
  let {API} = useContext(AppContext);
  const [addonInit, setAddonInit] = useState("");
  const [copyState, setCopyState] = useState("");

  function getInitString() {
    fetch(`${API}/session/addoninit`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setAddonInit(data))
      .catch((err) => console.log(err));
  }

  function copyText(e) {
    console.log('click')
    navigator.clipboard.writeText(e.target.value);
    setCopyState("Copied to Clipboard!");
    setTimeout(() => {
      setCopyState("")
      setAddonInit("")
    }, 5000);
  }


  return(
    <Stack>
    <TextField
    multiline={true}
    readOnly
    onClick={(e) => copyText(e)}
    label={"Click to Copy"}
    value={addonInit}
    rows={4}
    />
    <Button onClick={() => getInitString()}>Update AddonInit String</Button>
    <Typography variant="caption">{copyState}</Typography>
    </Stack>

  )
}
