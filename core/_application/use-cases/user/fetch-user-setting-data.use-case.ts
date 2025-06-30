import { IUserRepository } from "@/core/_domain/repositories/IUserRepository";
import { IAuthenticationService } from "@/core/_domain/services/IAuthentication.service";
import { UserSettingResponse } from "@/core/_domain/types/user-repository.types";

export type FetchUserSettingDataUseCase = ReturnType<
  typeof fetchUserSettingDataUseCase
>;

export const fetchUserSettingDataUseCase =
  (
    userRepository: IUserRepository,
    authenticationService: IAuthenticationService
  ) =>
  async (): Promise<UserSettingResponse> => {
    const id = await authenticationService.getSession();
    const data = await userRepository.fetchUserSettingDataById(id);
    return data;
  };
