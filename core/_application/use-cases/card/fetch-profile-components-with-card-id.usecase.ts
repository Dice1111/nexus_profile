import { IProfileComponentRepository } from "@/core/_domain/repositories/IProfileComponentRepository";
import { FetchProfileComponentData } from "@/core/_domain/types/profile-component-repository.types";

export type IFetchProfileComponentsWithCardIdUseCase = ReturnType<
  typeof fetchProfileComponentsWithCardIdUseCase
>;

export const fetchProfileComponentsWithCardIdUseCase =
  (profileComponentRepository: IProfileComponentRepository) =>
  async (cardID: string): Promise<FetchProfileComponentData[]> => {
    return await profileComponentRepository.fetch(cardID);
  };
