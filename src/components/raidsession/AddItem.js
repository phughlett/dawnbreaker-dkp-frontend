import {useState, useContext} from "react";
import {Button, TextField} from "@mui/material"
import AppContext from '../../contexts/AppContext';
import SessionSelect from './SessionSelect'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddCharacter from './AddCharacter'


export default function AddItem(props) {
  let {API, session} = useContext(AppContext);

  const [character, setCharacter] = useState('');
  const [itemId, setitemId] = useState('');
  const [itemName, setitemName] = useState('');
  const [dkpAmount, setdkpAmount] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };




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
      .then(async (response) => {
        if(response.ok){
          let data = await response.json()
          props.setSessionData(data)
          document.getElementById('itemInput').value = ''
        }else{
          let data = await response.json()
          props.setSessionData(data.data)
          handleClickOpen()
        }
      })
      .catch((err) => {
        console.log(err)

      });
  }


  function parseString(addonItemString){

    let addonItemArray = addonItemString.split(':');
    let bidInfo = addonItemArray[1];
    let bidArray = bidInfo.split(';');
    setCharacter(bidArray[0]);
    setitemId(bidArray[1]);
    setitemName(bidArray[2])
    setdkpAmount(bidArray[3])
  }



  return (
    <>
      <SessionSelect/>
      <TextField id='itemInput' onChange={(e) => parseString(e.target.value)} variant="outlined" label={"Add Item to Session"} />
      <Button onClick={()=>addItemBid()}variant="outlined">Add Item</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Missing Character?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <br></br>
          </DialogContentText>
          <AddCharacter setSessionData={props.setSessionData} character={character} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
