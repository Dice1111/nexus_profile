import { IAuthenticationService } from "@/core/domain/services/IAuthentication.service";
import bcrypt from "bcrypt";

export class AuthenticationService implements IAuthenticationService {
  async validatePasswords(
    inputPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }
}
