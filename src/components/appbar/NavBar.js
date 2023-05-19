import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dawnbreaker DKP
          </Typography>
          <Box sx={{ml: 1, mr:1}}><Link to={'/ledger'}>Ledger</Link></Box>
          <Box sx={{ml: 1, mr:1}}><Link style={{leftMargin:'5rem'}} to={'/characters'}>Characters</Link></Box>
          <Box sx={{ml: 1, mr:1}}><Link style={{leftMargin:'5rem'}} to={'/sessions'}>Sessions</Link></Box>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}