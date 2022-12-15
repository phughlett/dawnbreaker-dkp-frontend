import {useState, useContext} from "react";
import {Button, TextField} from "@mui/material"
import AppContext from '../../contexts/AppContext';
import SessionSelect from './SessionSelect'
import { useParams } from "react-router-dom";

export default function AddCharacter(props) {

  let {API, session, getCharacters} = useContext(AppContext);

  const [character, setCharacter] = useState('');
  let { id } = useParams();




  function addCharacterToSession() {
    let body = {character, session, action: "ADD_CHARACTER"};

    if(character === '') return alert("Character Name Required")

    body = JSON.stringify(body);
    fetch(`${API}/session/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
    .then(async (response) => {
        if(response.ok){
          let data = await response.json()
          await getCharacters()
          props.setSessionData
        }else{
          let data = await response.json()
          console.log(data.data)
          props.setSessionData(data.data)
          alert(data.message)
        }
      })
    .catch((err) => {
        console.log(err)

      });  }






  return (
    <>
      <TextField required="true" onChange={(e) => setCharacter(e.target.value)} variant="outlined" label={"Add Character to Session"} />
      <Button onClick={()=>addCharacterToSession()}variant="outlined">Add Character</Button>
    </>
  );
}
