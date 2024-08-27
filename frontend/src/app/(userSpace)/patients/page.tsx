"use client";

import { patientService } from "@/axios/patient";
import AuthContext from "@/context/authContext";
import { Patient } from "@/interfaces/patient";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, CssBaseline, FormControl, FormHelperText, Input, InputLabel, List, ListItem, styled, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { amber } from "@mui/material/colors";
import Link from "next/link";
import { FormEvent, useContext, useEffect, useState } from "react";

export default function Home() {
  
  const auth = useContext(AuthContext);
  
  const [patients, setPatients] = useState<Patient[]>([]);

  const fetchPatients = async() => {
    try {
      setPatients(await patientService.getAll());
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchPatients();
  }, []);

  const deletePatient = async (patientId: string) => {
    const confirmation = confirm("Are you sure you want to delete this patient?");
    
    if(confirmation) {
      try {
        const result = await patientService.delete(patientId);

        fetchPatients();
      } catch (err) {
        console.error(err);
      }
    }
  }

  const CustomTable = styled(Table)(({ theme }) => {
    return {
      backgroundColor: amber[100]
    };
  });

  return (
    <Container component="main">
      <div className="flex pb-4"><div className="flex m-auto"><Link href={"/patients/create"}><Button variant="contained">Register new patient</Button></Link></div></div>
      <Box>
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">BirthDate</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((p) => (
              <TableRow
                key={p.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {p.name}
                </TableCell>
                <TableCell align="right">{p.email}</TableCell>
                <TableCell align="right">{p.birthDate.toString()}</TableCell>
                <TableCell align="right">{p.city.name}</TableCell>
                <TableCell align="right"><Link href={`/patients/${p.id}/edit`}><Button>Edit</Button></Link></TableCell>
                <TableCell align="right"><Button onClick={() => deletePatient(p.id)}>Delete</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
}
