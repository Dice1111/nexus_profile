import { ProfileComponentModel } from "@/core/_domain/models/profile-component.model";
import { IProfileComponentRepository } from "@/core/_domain/repositories/IProfileComponentRepository";

export type IFetchProfileComponentsWithCardIdUseCase = ReturnType<
  typeof fetchProfileComponentsWithCardIdUseCase
>;

export const fetchProfileComponentsWithCardIdUseCase =
  (profileComponentRepository: IProfileComponentRepository) =>
  async (cardID: string): Promise<ProfileComponentModel[]> => {
    return await profileComponentRepository.fetch(cardID);
  };
