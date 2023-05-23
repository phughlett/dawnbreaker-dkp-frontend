import AppContext from "../contexts/AppContext";
import { useState, useEffect, useContext } from "react";
import HomeTable from "../components/home/HomeTable";
import NavBar from "../components/appbar/NavBar";
import Typography from "@mui/material/Typography";
import { Grid, Box } from "@mui/material";

export default function Home() {
  let {
    API,
    setSession,
    session,
    sessionOptions,
    setSessionOptions,
    characters,
    getCharacters,
    getRaidTeams,
    raidTeams,
  } = useContext(AppContext);

  useEffect(() => {
    getRaidTeams();
  }, []);

  return (
    <>
      <NavBar pageName={"Dawnbreaker DKP"} />
      <Grid container justifyContent="center"  spacing={1.5}>
        {raidTeams.map((raidTeam) => (
          <Grid item xs={12} sm={6} md={3}>
            <HomeTable raidTeam={raidTeam} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
