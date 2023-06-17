import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LoginButton from '../button/LoginButton'
import LogoutButton from '../button/LogoutButton'
import { Link } from "react-router-dom";
import AppContext from "../../contexts/AppContext";
import { useContext } from "react";


export default function NavBar({pageName}) {

  let { admin } = useContext(AppContext);


  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link style={{leftMargin:'5rem', color:'white', textDecoration: 'none'}} to={'/'}>{pageName}</Link>
          </Typography>
          <Box sx={{ml: 1, mr:1}}><Link to={'/ledger'}>Ledger</Link></Box>
          {admin ? <Box sx={{ml: 1, mr:1}}><Link style={{leftMargin:'5rem'}} to={'/characters'}>Characters</Link></Box> : <></>}
          {admin ? <Box sx={{ml: 1, mr:1}}><Link style={{leftMargin:'5rem'}} to={'/teams'}>Teams</Link></Box> : <></>}
          {admin ?<Box sx={{ml: 1, mr:1}}><Link style={{leftMargin:'5rem'}} to={'/sessions'}>Sessions</Link></Box> : <></>}
          {admin ?<Box sx={{ml: 1, mr:1}}><Link style={{leftMargin:'5rem'}} to={'/admin'}>Admin</Link></Box> : <></>}
          {admin ? <LogoutButton/> : <LoginButton/>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}