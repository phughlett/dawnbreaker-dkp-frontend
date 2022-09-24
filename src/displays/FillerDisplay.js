import logo from "../DB_LOGO.svg";
import StartSession from '../components/raidsession/StartSession'
import AddItem from '../components/raidsession/AddItem'
import StopSession from '../components/raidsession/StopSession'
import AddonInit from '../components/addonInit/AddonInit'
import { Box, Grid, Stack } from "@mui/material";

export default function FillerDisplay(){
  return(
    <Box sx={{ margin: "5rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} xl={12}><Box sx={{width:400,height:200, margin:'auto'}}><img src={logo} alt="Dawnbreaker" /></Box></Grid>
        <Grid item xs={4}>
          <Stack spacing={1.5}>
            <StartSession/>
            <AddonInit/>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={1.5}>
          <AddItem/>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={1.5}>
          <StopSession/>
          </Stack>
        </Grid>
      </Grid>
    </Box>

  )
}