import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(operationDescription, operationKind, operationSign, transactionValue) {
  return { operationDescription, operationKind, operationSign, transactionValue };
}

export default function BasicTable(data) {
  const [rows, setRows] = useState([])
  
  useEffect(() => {
    if (data.operations) {
      const rdata = data.operations.map(d => {
        return createData(d.operationDescription, d.operationKind, d.operationSign, d.transactionValue)
      })

      setRows(rdata)
    }
  }, [data])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Operation Desc</TableCell>
            <TableCell align="right">Operation Kind</TableCell>
            <TableCell align="right">Operation Sign</TableCell>
            <TableCell align="right">Transaction Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.operationDescription}
              </TableCell>
              <TableCell align="right">{row.operationKind}</TableCell>
              <TableCell align="right">{row.operationSign}</TableCell>
              <TableCell align="right">{row.transactionValue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}