import cookieParser from "cookie-parser";
import express from "express";

import { UserRepositoryPrisma } from "./Infrastructure/Repositories/UserRepository.prisma";
import { CountryRepositoryPrisma } from "./Infrastructure/Repositories/CountryRepository.prisma";

import { PrismaClient } from "@prisma/client";
import {
  AuthToken,
  jwtErrorHandler,
  jwtMiddleware,
  TokenMap,
} from "./Validation/jwt";

import { Auth } from "./app/Entities/Auth.entity";
import { AuthRoutes } from "./Infrastructure/Routes/Auth.Routes";
import AuthInteractor from "./Infrastructure/Interactors/AuthInteractor";
import PasswordService from "./Infrastructure/Services/PasswordService";
import { PatientRepositoryPrisma } from "./Infrastructure/Repositories/PatientRepository.prisma";
import PatientInteractor from "./Infrastructure/Interactors/PatientInteractor";
import { PatientRoutes } from "./Infrastructure/Routes/Patient.Routes";
import { LocationRoutes } from "./Infrastructure/Routes/Location.Routes";
import CountryInteractor from "./Infrastructure/Interactors/CountryInteractor";
import { CityRepositoryPrisma } from "./Infrastructure/Repositories/CityRepository.prisma";
import { StateRepositoryPrisma } from "./Infrastructure/Repositories/StateRepository.prisma";
import StateInteractor from "./Infrastructure/Interactors/StateInteractor";
import CityInteractor from "./Infrastructure/Interactors/CityInteractor";

import cors from 'cors';

const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const getTokens = (req: express.Request): TokenMap => {
  return new Map<AuthToken, string>([
    [AuthToken.AccessToken, req.cookies[AuthToken.AccessToken]],
    [AuthToken.RefreshToken, req.cookies[AuthToken.RefreshToken]],
  ]);
};
const refreshAccessToken = (refreshToken: Auth) => {
  const auth = refreshToken;

  return { id: auth.id, email: auth.email };
};

const jsonwtMiddleware = jwtMiddleware({ getTokens, refreshAccessToken });

const prisma = new PrismaClient();

const userRepository = new UserRepositoryPrisma(prisma.user);
const patientRepository = new PatientRepositoryPrisma(prisma.patient);
const countryRepository = new CountryRepositoryPrisma(prisma.country);
const stateRepository = new StateRepositoryPrisma(prisma.state);
const cityRepository = new CityRepositoryPrisma(prisma.city);

const passwordService = new PasswordService(10);

const authInteractor = new AuthInteractor(userRepository, passwordService);
const patientInteractor = new PatientInteractor(patientRepository);
const countryInteractor = new CountryInteractor(countryRepository);
const stateInteractor = new StateInteractor(stateRepository);
const cityInteractor = new CityInteractor(cityRepository);

AuthRoutes(app, jsonwtMiddleware, authInteractor);
PatientRoutes(app, jsonwtMiddleware, patientInteractor);
LocationRoutes(app, countryInteractor, stateInteractor, cityInteractor);

app.use(jwtErrorHandler);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).json({
    error: "Internal server error",
  });
  return;
})

app.listen(PORT, () => {
  console.log(`Running on: http://localhost:${PORT}`);
});