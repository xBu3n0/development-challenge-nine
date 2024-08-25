export default interface PasswordServiceInterface {
  hash(password: string): Promise<string>;

  compare(password: string, encryptedPassword: string): Promise<boolean>;
}
