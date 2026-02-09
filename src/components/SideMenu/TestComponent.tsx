import { Box, Button, Stack, TextField, Toolbar, Typography } from "@mui/material";
import "./TestComponent.css";
import React from "react";
import { DialogExample } from "../Layout/DialogExample";
import { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from "@mui/material";

export function TestComponent() {
    return (
        <DialogExample></DialogExample>
    )
}



const initialRows = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
];

export default function EditableMuiTable() {
  const [rows, setRows] = useState(initialRows);

  const handleChange = (id: number, field: string, value: string | number) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <TextField
                  variant="standard"
                  value={row.name}
                  onChange={(e) =>
                    handleChange(row.id, "name", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="standard"
                  type="number"
                  value={row.age}
                  onChange={(e) =>
                    handleChange(row.id, "age", e.target.value)
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

