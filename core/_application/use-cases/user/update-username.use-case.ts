import { UserRepository } from "@/core/_infrastructure/repositories/user.repository";
import { AuthenticationService } from "@/core/_infrastructure/services/authentication.service";

export type UpdateUsernameUseCase = ReturnType<typeof updateUsernameUseCase>;

export const updateUsernameUseCase =
  (
    userRepository: UserRepository,
    authenticationService: AuthenticationService
  ) =>
  async (name: string): Promise<void> => {
    const session = await authenticationService.getSession();
    const data = {
      id: session,
      name: name,
    };
    await userRepository.updateUserName(data);
  };
