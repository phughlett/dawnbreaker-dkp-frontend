import { useContext, useState } from "react";
import AppContext from '../../contexts/AppContext';
import {Button} from "@mui/material"
import SessionSelect from './SessionSelect'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function StopSession() {
  let {API, session, setSession, navigate} = useContext(AppContext);

  const [open, setOpen] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    setOpen(false);
    cancelSession()
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
      .then((response) => {
        response.json()

      })
      .catch((err) => console.log(err));
    setSession('')
    navigate("/")
  }


  function cancelSession(sessionName = session) {

    handleClose()
    let body = { action: "CANCEL", sessionName };

    body = JSON.stringify(body);
    fetch(`${API}/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((response) => {
        response.json()

      })
      .catch((err) => console.log(err));
    setSession('')
    navigate("/")
  }

  return (
    <>
      <Button onClick={() => endSession()} variant="outlined">
        End Session
      </Button>
      <Button onClick={() => handleClickOpen()} color="error" variant="contained">
        Cancel Session
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Session?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will delete the session and revert DKP for any gear added to this session.
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
