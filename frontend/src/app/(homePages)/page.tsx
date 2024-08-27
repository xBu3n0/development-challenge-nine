"use client";

import AuthContext from "@/context/authContext";
import { Box, Container } from "@mui/material";
import { useContext } from "react";

export default function Home() {
  const auth = useContext(AuthContext);

  return (
    <Container component="main">
      <Box>
        {auth ? <>Welcome {auth.email}</> : <>Login to access the system</>}
      </Box>
    </Container>
  );
}
