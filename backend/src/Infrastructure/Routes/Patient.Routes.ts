import express from "express";
import { JwtMiddleware } from "@/Validation/jwt";
import PatientController from "../Controllers/Patient.controller";
import PatientInteractorInterface from "@/app/Interactors/PatientInteractor.interface";

export function PatientRoutes(
  app: express.Express,
  jwtMiddleware: JwtMiddleware,
  patientInteractor: PatientInteractorInterface,
): void {
  const patientController = new PatientController(patientInteractor);

  app.use("/api/patients", jwtMiddleware);

  // Listar
  app.get(
    "/api/patients",
    jwtMiddleware,
    patientController.list.bind(patientController),
  );
  // Criar
  app.post(
    "/api/patients",
    jwtMiddleware,
    patientController.create.bind(patientController),
  );
  // Atualizar
  app.put(
    "/api/patients/:id",
    jwtMiddleware,
    patientController.update.bind(patientController),
  );
  // Excluir
  app.delete(
    "/api/patients/:id",
    jwtMiddleware,
    patientController.delete.bind(patientController),
  );
  // Selecionar 1 paciente
  app.get(
    "/api/patients/:id",
    jwtMiddleware,
    patientController.findById.bind(patientController),
  );
}
