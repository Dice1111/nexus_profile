import { fetchUserSettingDataUseCase } from "@/core/_application/use-cases/user/fetch-user-setting-data.use-case";
import { fetchUserSettingDataController } from "@/core/_controllers/user/fetch-user-setting-data.controller";
import { UserRepository } from "@/core/_infrastructure/repositories/user.repository";
import { AuthenticationService } from "@/core/_infrastructure/services/authentication.service";

export const buildFetchUserSettingDataController = () => {
  const userRepository = new UserRepository();
  const authenticationService = new AuthenticationService();
  const usecase = fetchUserSettingDataUseCase(
    userRepository,
    authenticationService
  );
  return fetchUserSettingDataController(usecase);
};
