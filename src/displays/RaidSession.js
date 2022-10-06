import {useState, useEffect, useContext} from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import AddItem from '../components/raidsession/AddItem'
import { useParams } from "react-router-dom";
import AppContext from '../contexts/AppContext'
import {Button} from "@mui/material";
import AddonInit from '../components/addonInit/AddonInit'
import { Box, Grid, Stack } from "@mui/material";

export default function RaidSession(props){
  let {API, characters, getCharacters} = useContext(AppContext);
  const [sessionData, setSessionData] = useState([])

  let { id } = useParams();


  function getSessionData(){
    fetch(`${API}/session/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setSessionData(data))
      .catch((err) => console.log(err));

  }

  useEffect(()=>{
    getSessionData();
    getCharacters();
  },[])



  function characterNameGetter(id){
   let match = characters.filter((character) => character.id === id )
   if(match.length === 0){
    return '';
   }else{
    return match[0].name;
   }
  }

  const postUpdate = (update) => {

    let sessionId = id;

    let body = {update, sessionId};

    body = JSON.stringify(body);
    console.log(body)

    fetch(`${API}/session/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));

  }

  function sendUpdate(update){
    return(
      <>
   <Button variant='outline' onClick={()=>postUpdate(update)}>Send Update</Button></>
    )
  }

  let rows = [];
  let columns = [
    {field: 'id', headerName: 'ID', width: 200},
    {field: 'raid_team', headerName: 'Raid Team', width: 200},
    {field: 'character_id', headerName: 'Character', width: 200, valueGetter: value => characterNameGetter(value.value)},
    {field: 'item', headerName: 'Item', width: 200},
    {field: 'itemId', headerName: 'Item ID', width: 200},
    {field: 'dkp', headerName: 'DKP', width: 200, editable: true},
    {field: 'created_at', headerName: 'created_at', width: 200},
    {field: 'updated_at', headerName: 'updated_at', width: 200},
    {field: 'actions', headerName: 'Actions', width: 200, renderCell: params => sendUpdate(params.row)}
  ];





  return(


    <Box sx={{ margin: "5rem" }}>
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Stack spacing={1.5}>
          <AddItem/>
          <AddonInit/>
        </Stack>
      </Grid>
      <Grid item xs={4}>
        <Stack spacing={1.5}>

        </Stack>
      </Grid>
      <Grid item xs={12}>
      <div style={{ height: 800, width: '100%' }}>
        <DataGrid rows={sessionData} columns={columns} />
      </div>

      </Grid>
    </Grid>
  </Box>




  )

}