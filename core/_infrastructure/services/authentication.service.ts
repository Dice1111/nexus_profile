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
    return "d1feb662-95a8-4097-bcd4-1f58f92632e9";
  }
}
