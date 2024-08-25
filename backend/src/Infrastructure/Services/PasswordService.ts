import PasswordServiceInterface from "@/app/Services/PasswordService.interface";
import bcrypt from "bcrypt";

export default class PasswordService implements PasswordServiceInterface {
  constructor(private readonly saltRounds: number) {}

  public async hash(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, this.saltRounds);

    return hashedPassword;
  }

  public async compare(
    password: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, encryptedPassword);
  }
}
