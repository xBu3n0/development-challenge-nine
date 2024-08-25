import Patient from "@/app/Entities/Patient.entity";
import CreatePatient from "@/app/Entities/CreatePatient.entity";
import UpdatePatient from "@/app/Entities/UpdatePatient.entity";

export default interface PatientInteractorInterface {
  list(ownerId: string): Promise<Patient[]>;
  create(ownerId: string, patient: CreatePatient): Promise<Patient>;
  findById(ownerId: string, patientId: string): Promise<Patient | null>;
  update(
    ownerId: string,
    patientId: string,
    patient: UpdatePatient,
  ): Promise<Patient | null>;
  delete(ownerId: string, patientId: string): Promise<Patient | null>;
}
