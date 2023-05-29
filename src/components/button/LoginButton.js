import {Button, Typography } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import AppContext from "../../contexts/AppContext";
import { useState, useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



export default function LoginButton() {

  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [badLogin, setBadLogin] = useState(false);
  let { API, setAdmin } = useContext(AppContext);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEnter = (e) =>{
    if(e.key === "Enter"){
      handleLogin()
    }
  }

  const handleLogin = () => {

    let body = {password};

    body = JSON.stringify(body)

    fetch(`${API}/admin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body,
    }).then((response) => {
      if(response.ok){
        //store cookie for 2 weeks
        let today = new Date();
        let expire = new Date();
        expire.setTime(today.getTime() + 3600000*24*14);
        document.cookie = "admin="+encodeURI('yes') + ";expires="+expire.toGMTString();
        setAdmin('yes')
        handleClose()
      }else{
        //display error
        setBadLogin(true)
      }
    }).catch(err => console.log(err))


    setPassword('')

  };

  return (
    <>
      <Button onClick={() => handleClickOpen()} color="inherit">
        Login
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleEnter}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        {badLogin ?  <Typography color="error" variant="caption">Incorrect Password</Typography> : <></> }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogin}>Login</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
