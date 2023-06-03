import Dialog from "@mui/material/Dialog";
import { Button, Stack, TextField, Box } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext, useState } from "react";
import AppContext from "../../contexts/AppContext";
import CharacterSelecter from "../textfields/CharacterSelecter";
import RaidSelecter from "../textfields/RaidSelecter";

export default function ManualItemEntry() {
  const [open, setOpen] = useState(false);
  const [raid_team, setRaidTeam] = useState('');
  const [character_name, setCharacter] = useState('');
  const [item, setItem] = useState('');
  const [itemId, setItemId] = useState('');
  const [dkp, setDkp] = useState('');
  let {API, setLedgerData} = useContext(AppContext);


  let title = "Manually add item?";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRaidTeam('')
    setCharacter('')
    setItem('')
    setItemId('')
    setDkp('')
  }

  const postAddItem = (update) => {

    let body = { update, action: "ADD_ITEM" };

    body = JSON.stringify(body);

    fetch(`${API}/ledger`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((response) => response.json())
      .then((data) => {
        setLedgerData(data)
        handleClose()
      })
      .catch((err) => console.log(err));
  };



  const actionButton = () => (
    <Button onClick={() => postAddItem({character_name, dkp, itemId, item, raid_team})}>Confirm</Button>
  );

  return (
    <Box sx={{ textAlign: "center" }}>
      <Button size="small" onClick={() => handleClickOpen()}>
        Add Manual Item Entry
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mt: 1 }}>
            <Stack spacing={2}>
              <RaidSelecter valueGetter={{setRaidTeam}} />
              <CharacterSelecter valueGetter={{ setCharacter }} />
              <TextField
                label={"Item"}
                defaultValue={item}
                onChange={(e) => setItem(e.target.value)}
              />
              <TextField
                label={"Item ID"}
                defaultValue={itemId}
                onChange={(e) => setItemId(e.target.value)}
                type="number"
              />
              <TextField
                label={"DKP Amount"}
                defaultValue={dkp}
                onChange={(e) => setDkp(e.target.value)}
              />
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancel</Button>
          {actionButton()}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
