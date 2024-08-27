import Patient from "@/app/Entities/Patient.entity";
import CreatePatient from "@/app/Entities/CreatePatient.entity";
import PatientInteractorInterface from "@/app/Interactors/PatientInteractor.interface";
import PatientRepositoryInterface from "@/app/Repositories/PatientRepository.interface";
import UpdatePatient from "@/app/Entities/UpdatePatient.entity";
import { FullPatient } from "@/app/Entities/FullPatient";

export default class PatientInteractor implements PatientInteractorInterface {
  constructor(private readonly patientRepository: PatientRepositoryInterface) {}

  public async list(ownerId: string): Promise<Patient[]> {
    return this.patientRepository.getAll(ownerId);
  }

  public async create(
    ownerId: string,
    patient: CreatePatient,
  ): Promise<Patient> {
    return await this.patientRepository.create(ownerId, patient);
  }

  public async findById(
    ownerId: string,
    patientId: string,
  ): Promise<FullPatient | null> {
    return this.patientRepository.findById(ownerId, patientId);
  }

  public async update(
    ownerId: string,
    patientId: string,
    patient: UpdatePatient,
  ): Promise<Patient | null> {
    return this.patientRepository.update(ownerId, patientId, patient);
  }

  public async delete(ownerId: string, patientId: string) {
    return this.patientRepository.delete(ownerId, patientId);
  }
}
