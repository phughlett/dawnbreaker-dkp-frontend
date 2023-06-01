import Dialog from "@mui/material/Dialog";
import { Button, Stack, TextField } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import AppContext from "../../contexts/AppContext";

export default function LedgerItemDialog({ modalControl, dialogData, button }) {
  let { characters, raidTeams } = useContext(AppContext);
  let { open, setOpen } = modalControl;
  let { title, dialogInfo } = dialogData;
  let { actionButton } = button;
  let disabled = title === "Delete Item";

  console.log(dialogInfo)

  dialogInfo.character_name = dialogInfo.character_id || dialogInfo.character_name


  const handleClose = () => {
    setOpen(false);
  };

  function characterNameGetter(id){

    let match = characters.filter((character) => character.id === id )
    if(match.length === 0){
     return '';
    }else{
     return match[0].name;
    }
   }

   function raidTeamNameGetter(id){

    let match = raidTeams.filter((team) => team.id === id )
    if(match.length === 0){
     return '';
    }else{
     return match[0].name;
    }

   }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mt: 1 }}>
          <Stack spacing={2}>
            <TextField
              label={"ID"}
              defaultValue={dialogInfo.id ? dialogInfo.id : ""}
              disabled={disabled}
            />
            <TextField
              label={"Raid Team"}
              defaultValue={dialogInfo.raid_team ? raidTeamNameGetter(dialogInfo.raid_team) : ""}
              disabled={disabled}
            />
            <TextField
              label={"Character"}
              defaultValue={
                dialogInfo.character_name ? characterNameGetter(dialogInfo.character_name) : ""
              }
              disabled={disabled}
            />
            <TextField
              label={"Item"}
              defaultValue={dialogInfo.item ? dialogInfo.item : ""}
              disabled={disabled}
            />
            <TextField
              label={"Item ID"}
              defaultValue={dialogInfo.item ? dialogInfo.itemId : ""}
              disabled={disabled}
            />
          </Stack>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>Cancel</Button>
        {actionButton()}
      </DialogActions>
    </Dialog>
  );
}
