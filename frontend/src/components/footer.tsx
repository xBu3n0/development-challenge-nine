import AuthContext from "@/context/authContext";
import { Avatar, Box, Button, Container, Icon, IconButton, Stack, TableFooter, TextField, Typography } from "@mui/material";
import { useContext } from "react";

export default function Footer() {
  const auth = useContext(AuthContext);

  return (
    <Box
    className="bottom-0"
    sx={{
      display: 'block',
      margin: 'auto',
      flexDirection: 'column',
      alignItems: 'center',
      height: 'full',
      gap: { xs: 4, sm: 8 },
      py: { xs: 8, sm: 10 },
      textAlign: { sm: 'center', md: 'left' },
    }}
    >
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: { xs: 4, sm: 8 },
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <div>
            Medcloud Challenge
          </div>
        </Box>
      </Container>
    </Box>
  );
}
