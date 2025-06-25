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
    return "383316c1-8876-424b-ba3b-b5e98211b4df";
  }

}
