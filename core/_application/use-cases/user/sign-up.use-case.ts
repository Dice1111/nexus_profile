import { IUserRepository } from "@/core/_domain/repositories/IUserRepository";
import { IAuthenticationService } from "@/core/_domain/services/IAuthentication.service";
import { SignUpData } from "@/schema/user/sign-up.schema";

export type SignUpUseCase = ReturnType<typeof signUpUseCase>;
export const signUpUseCase =
  (
    userRepository: IUserRepository,
    authenticationService: IAuthenticationService
  ) =>
  async (input: SignUpData): Promise<void> => {
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
