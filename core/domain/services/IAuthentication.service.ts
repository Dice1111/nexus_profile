export interface IAuthenticationService {
  validatePasswords(
    inputPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  generateHashedPassword(inputPassword: string): Promise<string>;
}
