import { z } from "zod";
import ValidateServiceInterface from "@/app/Services/ValidateService.interface";
import { Patient } from "@prisma/client";
import CreatePatient from "@/app/Entities/CreatePatient.entity";
import UpdatePatient from "@/app/Entities/UpdatePatient.entity";
import CreateUser from "@/app/Entities/CreateUser.entity";

export default class ValidateService implements ValidateServiceInterface {
  validateUuid(uuid: string): boolean {
    const validate = z.object({
      uuid: z.string().uuid()
    });

    const result = validate.safeParse({
      uuid,
    });

    return result.success;
  }

  validateCreateUser(createUser: CreateUser): boolean {
    const validate = z.object({
      email: z.string().email(),
      password: z.string().min(4)
    });

    const result = validate.safeParse({
      email: createUser.email,
      password: createUser.password
    });

    return result.success;
  }

  validatePatient(patient: Patient): boolean {
    const validate = z.object({
      name: z.string(),
      email: z.string().email(),
      cityId: z.string().uuid(),
    });

    const result = validate.safeParse({
      name: patient.name,
      email: patient.email,
      cityId: patient.cityId
    });

    return result.success;
  }
  validateCreatePatient(createPatient: CreatePatient): boolean {
    const validate = z.object({
      name: z.string(),
      email: z.string().email(),
      cityId: z.string().uuid(),
    });

    const result = validate.safeParse({
      name: createPatient.name,
      email: createPatient.email,
      cityId: createPatient.cityId
    });

    return result.success;
  }
  validateUpdatePatient(updatePatient: UpdatePatient): boolean {
    const validate = z.object({
      name: z.string(),
      email: z.string().email(),
      cityId: z.string().uuid(),
    });

    const result = validate.safeParse({
      name: updatePatient.name,
      email: updatePatient.email,
      cityId: updatePatient.cityId
    });

    return result.success;
  }
}
