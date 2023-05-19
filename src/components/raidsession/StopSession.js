import { useContext, useState } from "react";
import AppContext from "../../contexts/AppContext";
import { Button } from "@mui/material";
import SessionSelect from "./SessionSelect";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function StopSession() {
  let { API, session, setSession, navigate, setSessionOptions } =
    useContext(AppContext);

  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("")
  const [dialogDescription, setDialogDescription] = useState("");




  const handleClickProcess = () => {
    setOpen(true);
    setDialogTitle("Process Session?")
    setDialogDescription("This will process the session and apply attedance DKP from the session.");
  }

  const handleClickCancel = () => {
    setOpen(true);
    setDialogTitle("Cancel Session?")
    setDialogDescription("This will delete the session and revert DKP for any gear added to this session.");
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {    setOpen(false);

  };

  const handleAgree = () => {
    setOpen(false);
    if(dialogTitle === "Cancel Session?"){
      cancelSession()
    }else{
      endSession()
    }
  };

  function endSession(sessionName = session) {
    let body = { action: "CLOSE", sessionName };

    body = JSON.stringify(body);
    fetch(`${API}/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((response) => response.json())
      .then((data) => setSessionOptions(data))
      .catch((err) => console.log(err));
    setSession("");
    navigate("/");
  }

  function cancelSession(sessionName = session) {
    handleClose();
    let body = { action: "CANCEL", sessionName };

    body = JSON.stringify(body);
    fetch(`${API}/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((response) => response.json())
      .then((data) => setSessionOptions(data))
      .catch((err) => console.log(err));
    setSession("");
    navigate("/");
  }

  return (
    <>
      <Button onClick={() => handleClickProcess()} variant="contained" color="success">
        Process Session
      </Button>

      <Button
        onClick={() => handleClickCancel()}
        color="error"
        variant="contained"
      >
        Cancel Session
      </Button>


      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogDescription}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
