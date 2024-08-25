import CreateUser from "@/app/Entities/CreateUser.entity";
import LogInUser from "@/app/Entities/LogInUser.entity";
import User from "@/app/Entities/User.entity";
import UserRepositoryInterface from "@/app/Repositories/UserRepository.interface";

export default interface AuthInteractorInterface {
  validate(
    authToken: string | undefined,
    refreshToken: string | undefined,
  ): boolean;

  // Can thrown an error
  create(user: CreateUser): Promise<User>;

  signIn(user: LogInUser): Promise<User | null>;
}
