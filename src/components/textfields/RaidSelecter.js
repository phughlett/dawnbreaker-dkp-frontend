import { useState, useContext } from "react";
import AppContext from '../../contexts/AppContext';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function RaidSelecter({valueGetter}) {
  const [id, setId] = useState(null);
  let {raidTeams} = useContext(AppContext);

  let {setRaidTeam} = valueGetter



  const sortedTeams = raidTeams.sort((a,b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  })


  const raidMenu = sortedTeams.map((team) => <MenuItem value={team.id}>{team.name}</MenuItem>)

  const handleChange = (event) => {
    setId(event.target.value);
    setRaidTeam(event.target.value)
  };


  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="character-select-label">Raid Team</InputLabel>
        <Select
          labelId="character-select-label"
          id="character-simple-select"
          value={id}
          label="Raid Team"
          onChange={handleChange}
        >
          {raidMenu}
        </Select>
      </FormControl>
    </Box>
  );
}
