import { FetchUserSettingDataUseCase } from "@/core/_application/use-cases/user/fetch-user-setting-data.use-case";
import { UserSettingResponse } from "@/core/_domain/types/user-repository.types";

export const fetchUserSettingDataController =
  (fetchUserSettingDataUseCase: FetchUserSettingDataUseCase) =>
  async (): Promise<UserSettingResponse> => {
    const data = await fetchUserSettingDataUseCase();
    return data;
  };
