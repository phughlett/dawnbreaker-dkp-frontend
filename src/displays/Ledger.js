import {useState, useEffect, useContext} from 'react';
import { DataGrid  } from '@mui/x-data-grid';
import AppContext from '../contexts/AppContext'
import { Box, Grid, Stack } from "@mui/material";

export default function Ledger() {
  let {API, characters, getCharacters, setSession, navigate,raidTeams, getRaidTeams} = useContext(AppContext);
  const [sessionData, setSessionData] = useState([]);


  function getLedgerData(){
    fetch(`${API}/ledger`, {
      method: "GET",
    })
      .then((response) => {
        if(response.status === 400){
          navigate("/")
        }else{
          return response.json()
        }
        })
      .then((data) => {
        setSessionData(data)}
        )
      .catch((err) => {
        console.log(err)
      });

  }

  useEffect(() => {
    getLedgerData();
    getCharacters();
    getRaidTeams();

  }, [])

  function characterNameGetter(id){

    let match = characters.filter((character) => character.id === id )
    if(match.length === 0){
     return '';
    }else{
     return match[0].name;
    }
   }

   function raidTeamNameGetter(id){

    let match = raidTeams.filter((team) => team.id === id )
    if(match.length === 0){
     return '';
    }else{
     return match[0].name;
    }

   }


  let columns = [
    {field: 'raid_team', headerName: 'Raid Team', width: 200, valueGetter: value => raidTeamNameGetter(value.value)},
    {field: 'character_name', headerName: 'Character', width: 200, valueGetter: value => characterNameGetter(value.value)},
    {field: 'item', headerName: 'Item', width: 200},
    {field: 'itemId', headerName: 'Item ID', width: 75},
    {field: 'dkp', headerName: 'DKP', width: 75},
    {field: 'created_at', headerName: 'created_at', width: 200},
    {field: 'updated_at', headerName: 'updated_at', width: 200},
  ];


  return (
    <div style={{ height: 800, width: '100%' }}>
    <DataGrid rows={sessionData} columns={columns} initialState={{sorting: {sortModel:[{field: 'created_at', sort: 'desc'}]}}} />
  </div>
  );
}
