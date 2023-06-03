import Dialog from "@mui/material/Dialog";
import { Button, Stack, TextField } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext, useState } from "react";
import AppContext from "../../contexts/AppContext";
import CharacterSelecter from "../textfields/CharacterSelecter";
import RaidSelecter from "../textfields/RaidSelecter";

export default function LedgerItemDialog({modalControl, dialogData = {}, button, }) {
  const [id, setId] = useState("")
  const [raidTeam, setRaidTeam] = useState("")
  const [character, setCharacter] = useState("")
  const [item, setItem] = useState("")
  const [itemId, setItemId] = useState("")
  const [dkp, setDkp] = useState("")
  let { characters, raidTeams } = useContext(AppContext);
  let { open, setOpen } = modalControl;
  let { title, dialogInfo } = dialogData;
  let { actionButton } = button;
  let disabled = title === "Delete Item?";
  let manualEntry = title === "Manually add item?";

  dialogInfo.character_name = dialogInfo.character_name || dialogInfo.character_id


  const handleClose = () => {
    setOpen(false);
  };

  function characterNameGetter(id) {
    let match = characters.filter((character) => character.id === id);
    if (match.length === 0) {
      return "";
    } else {
      return match[0].name;
    }
  }

  function raidTeamNameGetter(id) {
    let match = raidTeams.filter((team) => team.id === id);
    if (match.length === 0) {
      return "";
    } else {
      return match[0].name;
    }
  }



  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mt: 1 }}>
          <Stack spacing={2}>
            {disabled ? (
              <TextField
                label={"ID"}
                defaultValue={dialogInfo ? dialogInfo.id : ""}
                disabled={disabled}
                onChange={(e) => setId(e.target.value)}
              />
            ) : (
              <></>
            )}
            {disabled ? (
              <TextField
                label={"Raid Team"}
                defaultValue={
                  dialogInfo ? raidTeamNameGetter(dialogInfo.raid_team) : ""
                }
                onChange={(e) => setId(e.target.value)}
                disabled={disabled}
              />
            ) : (
              <RaidSelecter valueGetter={setRaidTeam} />
            )}
            {disabled ? (
              <TextField
                label={"Character"}
                defaultValue={
                  dialogInfo
                    ? characterNameGetter(dialogInfo.character_name)
                    : ""
                }
                disabled={disabled}
              />
            ) : (
              <CharacterSelecter valueGetter={{setCharacter}} />
            )}
            {manualEntry ? (
              <TextField
                label={"Item"}
                defaultValue={dialogInfo ? dialogInfo.item : ""}
              />
            ) : (
              <TextField
                label={"Item"}
                defaultValue={dialogInfo ? dialogInfo.item : ""}
                disabled
              />
            )}
            {manualEntry ? (
              <TextField
                label={"Item ID"}
                defaultValue={dialogInfo ? dialogInfo.itemId : ""}
              />
            ) : (
              <TextField
                label={"Item ID"}
                defaultValue={dialogInfo ? dialogInfo.itemId : ""}
                disabled
              />
            )}
            {disabled ? (
              <TextField
                label={"DKP Amount"}
                defaultValue={dialogInfo ? dialogInfo.dkp : ""}
                disabled
              />
            ) : (
              <TextField
                label={"DKP Amount"}
                defaultValue={dialogInfo ? dialogInfo.dkp : ""}
              />
            )}
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
