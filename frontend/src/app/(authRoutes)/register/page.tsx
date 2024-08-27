"use client";

import { authService } from "@/axios/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, TextField, Typography, useFormControl } from "@mui/material";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Register() {
  // Redirecionar caso contra criada com sucesso.
  const router = useRouter();

  const [logged, setLogged] = useState(false);
  if(logged) {
    router.push('/');
  }

  // Validar campos
  const registerUserForm = z.object({
    email: z.string().email(),
    password: z.string().min(4),
    passwordConfirm: z.string().min(4),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterUserForm>({
    resolver: zodResolver(registerUserForm)
  });

  const onSubmit = async (data: RegisterUserForm) => {
    if(data.password !== data.passwordConfirm) {
      setError("passwordConfirm", { type: "manual", message: "Passwords do not match" });
    }
    
    try {
      const isAuth = await authService.register({ email: data.email, password: data.password });

      if(isAuth) {
        setLogged(true);
      }
    } catch(err) {
      const axiosError = err as AxiosError;
      const fieldErrors = (axiosError.response!.data as any).errors as RegisterUserError;

      setError("email", { type: "manual", message: fieldErrors.email })
    }
  }

  // Formulário
  return (
    <Container component="main" maxWidth="xs">
      <title>Register</title>
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
          Register
        </Typography>
        <Box sx={{ mt: 1 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
          <TextField
            margin="normal"
            required
            fullWidth
            id="passwordConfirm"
            type="password"
            label="Confirm password"
            {...register("passwordConfirm")}
            {...errors.passwordConfirm && {error: true, helperText: errors.passwordConfirm.message}}
            
            autoComplete="passwordConfirm"
          />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
}

/*
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@material-ui/core';
import { Controller } from 'react-hook-form';
import { userDataSchema } from './schema'; // import your zod schema

const MyForm = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(userDataSchema), // pass zod schema as resolver
  });

  const onSubmit = async (data) => {
    // handle form submission
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="name"
        render={({ onChange, value }) => (
          <TextField label="Name" value={value} onChange={onChange} />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ onChange, value }) => (
          <TextField label="Email" value={value} onChange={onChange} />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ onChange, value }) => (
          <TextField label="Password" value={value} onChange={onChange} type="password" />
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};
*/