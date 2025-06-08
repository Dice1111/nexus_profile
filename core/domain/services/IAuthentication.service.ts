export interface IAuthenticationService {
  validatePasswords(
    inputPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
