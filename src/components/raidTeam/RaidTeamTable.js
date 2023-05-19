import { useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button} from "@mui/material";

export default function RaidTeamTable(data){


  let rows = data.data;
  function createData(id: string,sessionName: string) {
    return { id, sessionName };
  }

  useEffect(()=>{
    rows.map((session) => {
      return createData(session.id, session.name)
    })
  },[data.data])


  function handleDelete(id){
    console.log(id)


  }

  function deleteButton(id){
    return(
      <>
      <Button variant='contained' color='error' onClick={()=>handleDelete(id)}>Delete Raid Team</Button>
      </>
    )
  }





  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Raid Team</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{deleteButton(row.id)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )


}