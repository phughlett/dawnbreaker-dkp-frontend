import { useState, useContext } from "react";
import AppContext from '../../contexts/AppContext';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function CharacterSelecter({valueGetter}) {
  const [id, setId] = useState('');
  let {characters} = useContext(AppContext);


  let {setCharacter} = valueGetter




  const sortedCharacters = characters.sort((a,b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  })
  const characterMenu = sortedCharacters.map((char) => <MenuItem value={char.id}>{char.name}</MenuItem>)

  const handleChange = (event) => {
    setId(event.target.value);
    setCharacter(event.target.value)
  };




  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="character-select-label">Character</InputLabel>
        <Select
          labelId="character-select-label"
          id="character-simple-select"
          value={id}
          label="Character"
          onChange={handleChange}
        >
          {characterMenu}
        </Select>
      </FormControl>
    </Box>
  );
}
