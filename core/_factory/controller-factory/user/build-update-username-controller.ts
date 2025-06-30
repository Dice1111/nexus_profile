import { updateUsernameUseCase } from "@/core/_application/use-cases/user/update-username.use-case";
import { updateUserNameController } from "@/core/_controllers/user/update-username.controller";
import { UserRepository } from "@/core/_infrastructure/repositories/user.repository";
import { AuthenticationService } from "@/core/_infrastructure/services/authentication.service";
import { updateUsernameSchema } from "@/schema/user/update-username.schema";

export const buildUpdateUsernameController = () => {
  const userRepository = new UserRepository();
  const authenticationService = new AuthenticationService();
  const usecase = updateUsernameUseCase(userRepository, authenticationService);
  return updateUserNameController(usecase, updateUsernameSchema);
};
