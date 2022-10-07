import {useState, useContext} from "react";
import {Button, TextField} from "@mui/material"
import AppContext from '../../contexts/AppContext';
import SessionSelect from './SessionSelect'

export default function AddItem(props) {
  let {API, session} = useContext(AppContext);

  const [character, setCharacter] = useState('');
  const [itemId, setitemId] = useState('');
  const [itemName, setitemName] = useState('');
  const [dkpAmount, setdkpAmount] = useState('');


  function addItemBid(sessionName = session) {
    let body = { character, itemId, itemName, dkpAmount, sessionName, action: "ADD_ITEM"};

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
        props.setSessionData(data);

      })
      .catch((err) => console.log(err));
  }


  function parseString(addonItemString){

    let addonItemArray = addonItemString.split(':');
    let bidInfo = addonItemArray[1];
    let bidArray = bidInfo.split(';');
    console.log(bidArray)
    setCharacter(bidArray[0]);
    setitemId(bidArray[1]);
    setitemName(bidArray[2])
    setdkpAmount(bidArray[3])
  }



  return (
    <>
      <SessionSelect/>
      <TextField onChange={(e) => parseString(e.target.value)} variant="outlined" label={"Add Item to Session"} />
      <Button onClick={()=>addItemBid()}variant="outlined">Add Item</Button>
    </>
  );
}
