"use client";

import { cityService } from "@/axios/city";
import { countryService } from "@/axios/country";
import { patientService } from "@/axios/patient";
import { stateService } from "@/axios/state";
import { UpdatePatientForm } from "@/interfaces/updatePatientForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControl, FormControlLabel, Grid, InputLabel, Link, MenuItem, Select, TextField, Typography, useFormControl } from "@mui/material";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Register() {
  // Redirecionar caso contra criada com sucesso.
  const router = useRouter();
  const { id } = useParams<Readonly<{id: string}>>();

  const [updated, setUpdated] = useState(false);
  if(updated) {
    router.push('/patients');
  }

  const fetchCountries = async () => {
    try {
      const fetchedCountries = await countryService.getAll();

      setCountries(fetchedCountries);
    } catch (err) {
      console.error(err);
    }
  }

  const fetchPatient = async () => {
    try {
      const patient = await patientService.findById(id);
      const oldDate = new Date(patient.birthDate);

      setValue("name", patient.name);
      setValue("birthDate", `${oldDate.getFullYear()}-${oldDate.getMonth().toString().padStart(2, '0')}-${oldDate.getDay().toString().padStart(2, '0')}`);
      setValue("email", patient.email);
      setValue("cityId", patient.cityId);

      setCity(patient.city.id);
      setState(patient.city.state.id);
      setCountry(patient.city.state.country.id);

      await fetchCountries();
      await fetchStates(patient.city.state.country.id);
      await fetchCities(patient.city.state.id);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchPatient();
  }, []);

  // Validar campos
  const updatePatientForm = z.object({
    name: z.string().min(2),
    birthDate: z.string().date(),
    email: z.string().email(),
    cityId: z.string().uuid(),
  });

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<UpdatePatientForm>({
    resolver: zodResolver(updatePatientForm)
  });

  const onSubmit = async (data: UpdatePatientForm) => {
    try {
      const patient = await patientService.update(id, data);

      if(patient) {
        setUpdated(true);
      }
    } catch(err) {
      const axiosError = err as AxiosError;
      const fieldErrors = (axiosError.response!.data as any).errors as RegisterUserError;

      console.log(err);
      setError("email", { type: "manual", message: fieldErrors.email });
    }
  }

  // Localização
  const [countries, setCountries] = useState<Country[]>([]);
  const [country, setCountry] = useState('');

  const [states, setStates] = useState<State[]>([]);
  const [state, setState] = useState('');

  const [cities, setCities] = useState<City[]>([]);
  const [city, setCity] = useState('');

  const fetchStates = async (countryId: string) => {
    setCountry(countryId);

    try {
      const fetchedStates = await stateService.getByCountry(countryId);

      setStates(fetchedStates);
    } catch (err) {
      console.error(err);
    }
  }

  const fetchCities = async (stateId: string) => {
    setState(stateId);

    try {
      const fetchedCities = await cityService.getByState(stateId);

      setCities(fetchedCities);
    } catch (err) {
      console.error(err);
    }
  }

  // Formulário
  return (
    <Container component="main" maxWidth="xs">
      <title>Edit Patient</title>
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
          Edit Patient
        </Typography>
        <Box sx={{ mt: 1 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              type="text"
              label="Name"
              {...register("name")}
              {...errors.name && {error: true, helperText: errors.name.message}}
              
              autoComplete="name"
              autoFocus
            />
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
            />

            <InputLabel htmlFor="birthDate">BirthDate</InputLabel>
            <FormControl className="flex w-full">
              <TextField
                required
                fullWidth
                id="birthDate"
                type="date"
                {...register("birthDate")}
                {...errors.birthDate && {error: true, helperText: errors.birthDate.message}}
                
                autoComplete="birthDate"
              />
            </FormControl>
            <InputLabel>Localization</InputLabel>
            <div className="space-y-4">
              <FormControl className="flex w-full">
                <InputLabel>Country</InputLabel>
                <Select value={country} onChange={(e) => fetchStates(e.target.value as string)}>
                  {countries.map((countryR) => (
                    <MenuItem value={countryR.id}>{countryR.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className="flex w-full">
                <InputLabel>State</InputLabel>
                <Select value={state} onChange={(e) => fetchCities(e.target.value as string)}>
                  {states.map((stateR) => (
                    <MenuItem value={stateR.id}>{stateR.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className="flex w-full">
                <InputLabel>City</InputLabel>
                <Select value={city}
                  {...register("cityId")}
                  {...errors.cityId && {error: true, helperText: errors.cityId.message}}
                >
                  {cities.map((cityR) => (
                    <MenuItem value={cityR.id}>{cityR.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Patient
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
}