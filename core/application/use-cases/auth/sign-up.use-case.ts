import { AuthenticationError } from "@/core/domain/errors/auth.error";
import { IUserRepository } from "@/core/domain/repositories/IUserRepository";
import { IAuthenticationService } from "@/core/domain/services/IAuthentication.service";
import { SignUpInputType } from "@/schema/auth/sign-up.schema";

export type SignUpUseCaseType = ReturnType<typeof signUpUseCase>;
export const signUpUseCase =
  (
    userRepository: IUserRepository,
    authenticationService: IAuthenticationService
  ) =>
  async (input: SignUpInputType): Promise<void> => {
    const hashedPassword = await authenticationService.generateHashedPassword(
      input.password
    );

    const user = {
      name: input.name,
      email: input.email,
      passwordHash: hashedPassword,
    };
    await userRepository.create(user);
  };
