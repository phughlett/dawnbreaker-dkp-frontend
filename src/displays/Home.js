import AppContext from "../contexts/AppContext";
import {useEffect, useContext } from "react";
import HomeTable from "../components/home/HomeTable";
import NavBar from "../components/appbar/NavBar";
import { Grid } from "@mui/material";

export default function Home() {
  let {
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
          <Grid key={raidTeam.name} item xs={12} sm={6} md={3}>
            <HomeTable raidTeam={raidTeam} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
