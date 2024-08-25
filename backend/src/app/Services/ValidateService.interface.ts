import CreatePatient from "../Entities/CreatePatient.entity";
import CreateUser from "../Entities/CreateUser.entity";
import UpdatePatient from "../Entities/UpdatePatient.entity";

export default interface ValidateServiceInterface {
  validateUuid(uuid: string): boolean;
  
  validateCreateUser(createUser: CreateUser): boolean;
  
  validateCreatePatient(createPatient: CreatePatient): boolean;
  validateUpdatePatient(updatePatient: UpdatePatient): boolean;
}
