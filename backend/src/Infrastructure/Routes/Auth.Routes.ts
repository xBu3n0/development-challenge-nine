import express from "express";
import AuthController from "./../../Infrastructure/Controllers/Auth.controller";
import AuthInteractorInterface from "./../../app/Interactors/AuthInteractor.interface";
import { JwtMiddleware } from "@/Validation/jwt";

export function AuthRoutes(
  app: express.Express,
  jwtMiddleware: JwtMiddleware,
  authInteractor: AuthInteractorInterface,
): void {
  const authController = new AuthController(authInteractor);

  app.get(
    "/api/validate",
    jwtMiddleware,
    authController.validate.bind(authController),
  );
  app.post("/api/logIn", authController.logIn.bind(authController));
  app.post("/api/", authController.create.bind(authController));
  app.get("/api/logOut", authController.logOut.bind(authController));
}
