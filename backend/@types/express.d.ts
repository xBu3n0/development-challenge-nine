import { Auth } from "@/app/Entities/Auth.entity";
import { Express } from "express";

declare global {
  namespace Express {
    export interface Request {
      auth: Auth;
    }
  }
}
