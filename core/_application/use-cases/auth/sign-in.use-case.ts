import { AuthenticationError } from "@/core/_domain/errors/auth.error";
import { IUserRepository } from "@/core/_domain/repositories/IUserRepository";
import { IAuthenticationService } from "@/core/_domain/services/IAuthentication.service";
import { SignInInputType } from "@/schema/auth/sign-in.schema";

export type SignInUseCaseType = ReturnType<typeof signInUseCase>;
export const signInUseCase =
  (
    userRepository: IUserRepository,
    authenticationService: IAuthenticationService
  ) =>
  async (input: SignInInputType): Promise<void> => {
    const existingUser = await userRepository.findByEmail(input.email);

    if (!existingUser) {
      throw new AuthenticationError("User does not exist");
    }
    const validPassword = await authenticationService.validatePasswords(
      input.password,
      existingUser.passwordHash
    );

    if (!validPassword) {
      throw new AuthenticationError("Incorrect username or password");
    }
  };
