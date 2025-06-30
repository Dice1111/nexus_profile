import { AuthenticationError } from "@/core/_domain/errors/auth.error";
import { IUserRepository } from "@/core/_domain/repositories/IUserRepository";
import { IAuthenticationService } from "@/core/_domain/services/IAuthentication.service";
import { SignInData } from "@/schema/user/sign-in.schema";

export type SignInUseCase = ReturnType<typeof signInUseCase>;
export const signInUseCase =
  (
    userRepository: IUserRepository,
    authenticationService: IAuthenticationService
  ) =>
  async (input: SignInData): Promise<void> => {
    const passwordHash = await userRepository.findPasswordHashByEmail(
      input.email
    );

    const validPassword = await authenticationService.validatePasswords(
      input.password,
      passwordHash
    );

    if (!validPassword) {
      throw new AuthenticationError("Incorrect username or password");
    }
  };
