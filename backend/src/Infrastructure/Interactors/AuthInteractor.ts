import CreateUser from "@/app/Entities/CreateUser.entity";
import LogInUser from "@/app/Entities/LogInUser.entity";
import User from "@/app/Entities/User.entity";
import AuthInteractorInterface from "@/app/Interactors/AuthInteractor.interface";
import UserRepositoryInterface from "@/app/Repositories/UserRepository.interface";
import PasswordServiceInterface from "@/app/Services/PasswordService.interface";

export default class AuthInteractor implements AuthInteractorInterface {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly passwordService: PasswordServiceInterface,
  ) {}

  validate(
    authToken: string | undefined,
    refreshToken: string | undefined,
  ): boolean {
    if (authToken === undefined || refreshToken === undefined) {
      return false;
    }

    return true;
  }

  async create(user: CreateUser): Promise<User> {
    user.password = await this.passwordService.hash(user.password);

    return await this.userRepository.create(user);
  }

  async signIn(user: LogInUser): Promise<User | null> {
    const dbUser = await this.userRepository.findByEmail(user.email);

    if (
      !dbUser ||
      !(await this.passwordService.compare(user.password, dbUser.password))
    ) {
      return null;
    }

    return dbUser;
  }
}
