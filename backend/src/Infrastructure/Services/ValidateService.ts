import { z } from "zod";
import ValidateServiceInterface from "@/app/Services/ValidateService.interface";
import { Patient } from "@prisma/client";
import CreatePatient from "@/app/Entities/CreatePatient.entity";
import UpdatePatient from "@/app/Entities/UpdatePatient.entity";
import CreateUser from "@/app/Entities/CreateUser.entity";

export default class ValidateService implements ValidateServiceInterface {
  validateUuid(uuid: string): boolean {
    return z.string().isUUID;
  }

  validateCreateUser(createUser: CreateUser): boolean {
    return true;
  }

  validatePatient(patient: Patient): boolean {
    return true;
  }
  validateCreatePatient(createPatient: CreatePatient): boolean {
    return true;
  }
  validateUpdatePatient(updatePatient: UpdatePatient): boolean {
    return true;
  }
}
