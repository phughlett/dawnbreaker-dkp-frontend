import { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import AppContext from "../contexts/AppContext";
import { Grid, Stack, Button } from "@mui/material";
import NavBar from "../components/appbar/NavBar";

export default function Characters() {
  let {
    API,
    characters,
    getCharacters,
    setSession,
    navigate,
    raidTeams,
    getRaidTeams,
    setCharacters,
  } = useContext(AppContext);
  const [sessionData, setSessionData] = useState([]);

  useEffect(() => {
    getCharacters();
    getRaidTeams();
  }, []);

  function raidTeamNameGetter(id) {
    let match = raidTeams.filter((team) => team.id === id);
    if (match.length === 0) {
      return "";
    } else {
      return match[0].name;
    }
  }

  function actionButtons(update) {

    const postUpdate = (update) => {
      let body = { update };

      body = JSON.stringify(body);

      fetch(`${API}/characters/${update.name}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      })
        .then((response) => response.json())
        .then((data) => setCharacters(data))
        .catch((err) => console.log(err));
    };
    return (
      <>
        <Button
          size="small"
          variant="contained"
          onClick={() => postUpdate(update)}
        >
          Send Update
        </Button>
      </>
    );
  }

  let classOptions = [
    "Death Knight",
    "Warrior",
    "Paladin",
    "Rogue",
    "Hunter",
    "Shaman",
    "Druid",
    "Mage",
    "Priest",
    "Warlock",
  ];
  let roleOptions = ["Tank", "DPS", "Healer"];

  let raidOptions = raidTeams.map((team) => {
    return { value: team.id, label: team.name };
  });
  raidOptions.push({ value: null, label: "UNASSIGN" });

  let columns = [
    {
      field: "raid_team",
      type: "singleSelect",
      headerName: "Raid Team",
      width: 200,
      editable: true,
      valueGetter: (value) => raidTeamNameGetter(value.value),
      valueOptions: raidOptions,
    },
    { field: "name", headerName: "Name", width: 200, editable: true },
    { field: "dkp", headerName: "DKP", width: 75, editable: true },
    {
      field: "characterClass",
      type: "singleSelect",
      headerName: "Class",
      width: 75,
      editable: true,
      valueOptions: classOptions,
    },
    {
      field: "role",
      type: "singleSelect",
      headerName: "Role",
      width: 75,
      editable: true,
      valueOptions: roleOptions,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => actionButtons(params.row),
    },
  ];

  return (
    <>
      <NavBar pageName={"Characters"} />
      <div style={{ height: 800, width: "100%" }}>
        <DataGrid
          rows={characters}
          columns={columns}
          initialState={{
            sorting: { sortModel: [{ field: "raid_team", sort: "asc" }] },
          }}
        />
      </div>
    </>
  );
}
