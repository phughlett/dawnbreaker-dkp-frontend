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

export default function DKPEarnedTable(data) {
  const rows = data.dkpGain.sort((a,b) => {
    return new Date(b.created_at) - new Date(a.created_at)
  })
  console.log(rows)

  function formatDate(date){
    let created = new Date(date);
    let options = {year: 'numeric', month: 'long', day: 'numeric' }
    let formattedDate = created.toLocaleDateString('en-US', options)
    return formattedDate
  }

  return (
    <Box sx={{textAlign: 'center', maxWidth: '90%'}}>
    <TableContainer sx={{ maxHeight: 300 }} align="center" component={Paper}>
      <Table size="small" stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Entry</TableCell>
            <TableCell align="center">DKP</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
            >
              <TableCell align="center" component="th" scope="row">
                {formatDate(row.created_at)}
              </TableCell>
              <TableCell align="center">{row.item}</TableCell>
              <TableCell align="center">{row.dkp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}
