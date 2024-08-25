import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

import PatientRepositoryInterface from "@/app/Repositories/PatientRepository.interface";
import Patient from "@/app/Entities/Patient.entity";
import CreatePatient from "@/app/Entities/CreatePatient.entity";
import UpdatePatient from "@/app/Entities/UpdatePatient.entity";

export class PatientRepositoryPrisma implements PatientRepositoryInterface {
  constructor(private readonly conn: Prisma.PatientDelegate<DefaultArgs>) {}

  public async getAll(ownerId: string): Promise<Patient[]> {
    return this.conn.findMany({
      where: {
        userId: ownerId,
      },
    });
  }

  public async findByName(
    ownerId: string,
    name: string,
  ): Promise<Patient | null> {
    return null;
  }

  public async findByOwner(ownerId: string): Promise<Patient[]> {
    return this.conn.findMany({
      where: {
        userId: ownerId,
      },
    });
  }

  public async findById(
    ownerId: string,
    patientId: string,
  ): Promise<Patient | null> {
    return this.conn.findFirst({
      where: {
        id: patientId,
        userId: ownerId,
      },
    });
  }

  public async create(
    ownerId: string,
    patient: CreatePatient,
  ): Promise<Patient> {
    return this.conn.create({
      data: {
        name: patient.name,
        birthDate: new Date(patient.birthDate),
        email: patient.email,
        userId: ownerId,
        cityId: patient.cityId,
      },
    });
  }

  public async update(
    ownerId: string,
    patientId: string,
    patient: UpdatePatient,
  ): Promise<Patient> {
    console.info("update");
    return this.conn.update({
      where: {
        id: patientId,
        userId: ownerId,
      },
      data: {
        name: patient.name,
        birthDate: new Date(patient.birthDate),
        email: patient.email,
        cityId: patient.cityId,
      },
    });
  }

  public async delete(
    ownerId: string,
    patientId: string,
  ): Promise<Patient | null> {
    return this.conn.delete({
      where: {
        id: patientId,
        userId: ownerId,
      },
    });
  }
}
