import { useEffect, useContext, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import AppContext from '../../contexts/AppContext';

export default function HomeTable(data) {
  const [rows, setRows] = useState([]);
  let {API, raidTeams} = useContext(AppContext);

  const raid = data.raidTeam;

  useEffect(() => {
    fetch(`${API}/characters/team/${raid.id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        let sortedData = data.sort((a,b) => {
          return b.dkp - a.dkp
        })

        setRows(sortedData)
      })
      .catch((err) => console.log(err));
  }, []);




  return (
    <Box sx={{textAlign: 'center', maxWidth: 400}}>
    <Typography  variant="h4">{raid.name}</Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400, maxWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Character</TableCell>
            <TableCell align="center">DKP</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.dkp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}
