import { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import AppContext from "../contexts/AppContext";
import { Button, Grid } from "@mui/material";
import NavBar from "../components/appbar/NavBar";
import DeleteButton from "../components/button/DeleteButton";
import ManualItemEntry from "../components/button/ManualItemEntry"
import ManualAttendanceEntry from "../components/button/ManualAttendanceEntry"


export default function Ledger() {
  let {
    API,
    characters,
    getCharacters,
    navigate,
    raidTeams,
    getRaidTeams,
    admin,
    ledgerData,
    setLedgerData,
    getLedgerData
  } = useContext(AppContext);



  useEffect(() => {
    getLedgerData();
    getCharacters();
    getRaidTeams();
  }, []);

  function characterNameGetter(id) {
    let match = characters.filter((character) => character.id === id);
    if (match.length === 0) {
      return "";
    } else {
      return match[0].name;
    }
  }

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
      let body = { update, action: "UPDATE_ITEM" };

      body = JSON.stringify(body);

      fetch(`${API}/ledger`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      })
        .then((response) => response.json())
        .then((data) => setLedgerData(data))
        .catch((err) => console.log(err));
    };

    const postDelete = (update) => {
      let body = { update, action: "DELETE_ITEM" };

      body = JSON.stringify(body);

      fetch(`${API}/ledger`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      })
        .then((response) => response.json())
        .then((data) => setLedgerData(data))
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
        <DeleteButton buttonAction={{ postDelete }} dialogInfo={update} />
      </>
    );
  }

  let columns = [
    {
      field: "raid_team",
      headerName: "Raid Team",
      width: 200,
      valueGetter: (value) => raidTeamNameGetter(value.value),
    },
    {
      field: "character_name",
      headerName: "Character",
      width: 200,
      valueGetter: (value) => characterNameGetter(value.value),
    },
    { field: "item", headerName: "Item", width: 400 },
    { field: "itemId", headerName: "Item ID", width: 75 },
    { field: "dkp", headerName: "DKP", width: 75 },
    { field: "created_at", headerName: "created_at", width: 200 },
    { field: "updated_at", headerName: "updated_at", width: 200 },
  ];

  let adminColumns = [
    {
      field: "raid_team",
      headerName: "Raid Team",
      width: 200,
      valueGetter: (value) => raidTeamNameGetter(value.value),
    },
    {
      field: "character_name",
      headerName: "Character",
      width: 200,
      valueGetter: (value) => characterNameGetter(value.value),
    },
    { field: "item", headerName: "Item", width: 400 },
    { field: "itemId", headerName: "Item ID", width: 75 },
    { field: "dkp", headerName: "DKP", width: 75, editable: true },
    { field: "created_at", headerName: "created_at", width: 200 },
    { field: "updated_at", headerName: "updated_at", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => actionButtons(params.row),
    },
  ];

  return (
    <>
      <NavBar pageName={"Ledger"} />
      <Grid alignItems="flex-start" justifyContent="center" container>
        {admin ?
        <>
        <Grid  xs={12} md={6} item><ManualItemEntry /></Grid>
        <Grid  xs={12} md={6} item><ManualAttendanceEntry /></Grid>
        </>
      : <></>}
        <Grid item xs={12} md={11}>
          <div style={{ height: '88vh', width: '100%' }}>
          <DataGrid
            rows={ledgerData}
            columns={admin ? adminColumns : columns}
            initialState={{
              sorting: { sortModel: [{ field: "created_at", sort: "desc" }] },
            }}
          />
          </div>
        </Grid>
      </Grid>
    </>
  );
}
