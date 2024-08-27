"use client";

import { authService } from "@/axios/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from 'zod';

export default function LogIn() {
  // Redireciona caso contra loggada com sucesso
  const router = useRouter();
  const [logged, setLogged] = useState(false);

  if(logged) {
    router.replace('/');
  }

  // Formulário de login
  const logInUserForm = z.object({
    email: z.string().email(),
    password: z.string().min(4)
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LogInUserForm>({
    resolver: zodResolver(logInUserForm)
  });

  const onSubmit = async (data: LogInUserForm) => {
    try {
      const isAuth = await authService.logIn({ email: data.email, password: data.password });

      if(isAuth) {
        setLogged(true);
      }
    } catch(err) {
      const axiosError = err as AxiosError;

      setError("email", { type: "manual", message: "Email or password is incorrect" })
      setError("password", { type: "manual", message: "Email or password is incorrect" })
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <title>Log In</title>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            type="text"
            label="Email Address"
            {...register("email")}
            {...errors.email && {error: true, helperText: errors.email.message}}
            
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            type="password"
            label="Password"
            {...register("password")}
            {...errors.password && {error: true, helperText: errors.password.message}}
            
            autoComplete="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
