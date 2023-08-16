import { useParams } from "react-router-dom";
import { useContext, useState, useEffect, Link } from "react";
import AppContext from "../contexts/AppContext";
import NavBar from "../components/appbar/NavBar";
import { Box, Grid, Stack, Typography, Divider } from "@mui/material";
import EventCard from "../components/card/EventCard";
import DKPEarnedTable from "../components/home/DKPEarnedTable"

export default function PersonalPage(props) {
  const [charFound, setCharFound] = useState(true);
  const [itemsWon, setItemsWon] = useState([]);
  const [dkpEarned, setdkpEarned] = useState([])
  const [raidTeamName, setRaidTeamName] = useState('Unassigned')
  const { character } = props;

  let { API, raidTeams } = useContext(AppContext);

  console.log(character);

  useEffect(() => {
    getCharacterLedgerData();
    if(character.raid_team){
      displayRaidTeamName()
    }

  }, []);

  const getCharacterLedgerData = () => {
    fetch(`${API}/ledger/${character.name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (response.ok) {
          setCharFound(true);
          let data = await response.json();

          let itemsWonArray = data.filter((entry) => entry.itemId !== 0);
          itemsWonArray.reverse()
          setItemsWon(itemsWonArray);
          let dkpEarned = data.filter((entry) => entry.itemId === 0);
          dkpEarned.reverse()
          setdkpEarned(dkpEarned);
        } else {
          setCharFound(false);
        }
      })
      .catch((err) => console.log(err));
  };



  const displayRaidTeamName = () => {
    let raidTeamName = raidTeams.find((team) => team.id === character.raid_team)
    console.log(raidTeamName)
    setRaidTeamName(raidTeamName.name + ' Raid')
  }

  return (
    <>
      <NavBar pageName={`${character.name}`} />
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Grid justifyContent="flex-start" container spacing={0.5}>
          <Grid item xs={12} sm={6}>
            <Box sx={{textAlign: 'center', maxHeight: 440}}>
            <Stack direction="column" alignContent="center" spacing={2}>
              <Typography variant="h4">
              {character.characterClass} {character.name}
              </Typography>
              <Divider orientation="horizontal" flexItem />
              <Typography variant="h4">
                DKP: {character.dkp}
              </Typography>
              <Divider orientation="horizontal" flexItem />
              <Typography variant="h4">
                {raidTeamName}
              </Typography>
            </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <DKPEarnedTable dkpGain={dkpEarned} />
          </Grid>
          {itemsWon.reverse().map((item) => (
            <Grid item xs={12} sm={6} md={3} lg={2} xl={2}>
              <EventCard character={character} cardData={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
