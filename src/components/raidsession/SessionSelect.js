import {useState, useEffect, useContext} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AppContext from '../../contexts/AppContext';



export default function SessionSelect(){
  let {API, setSession, session, sessionOptions, setSessionOptions} = useContext(AppContext);



  const handleChange = (event) => {
    setSession(event.target.value);
  };

  function getActiveSessions() {
    fetch(`${API}/session`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setSessionOptions(data))
      .catch((err) => console.log(err));
  }

  useEffect(()=>{
    getActiveSessions();
  },[session])

  return(

    <FormControl fullWidth>
    <InputLabel  id="demo-simple-select-label">Session</InputLabel>
      <Select
      labelId="Session"
      id="session-name"
      value={session}
      label="Session Name"
      onChange={handleChange}
      >
      {sessionOptions.map((session) => {
      return <MenuItem key={session.id} value={session.name}>{session.name}</MenuItem>})}
      </Select>
    </FormControl>

  )
}