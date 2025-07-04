import { IAuthenticationService } from "@/core/_domain/services/IAuthentication.service";
import bcrypt from "bcrypt";

export class AuthenticationService implements IAuthenticationService {
  private static readonly SALT_ROUNDS: number = 12;

  async validatePasswords(
    inputPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(inputPassword, hashedPassword);
  }

  async generateHashedPassword(inputPassword: string): Promise<string> {
    return bcrypt.hash(inputPassword, AuthenticationService.SALT_ROUNDS);
  }

  async getSession(): Promise<string> {
    //dummy
    return "d6765b31-2ac9-4ffa-a81e-92e42623744b";
  }
}
