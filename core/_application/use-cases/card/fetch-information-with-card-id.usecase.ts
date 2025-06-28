import { IInformationRepository } from "@/core/_domain/repositories/IInformationRepository";
import { FetchInformationData } from "@/core/_domain/types/information-repository.types";

export type IFetchInformationWithCardIdUseCase = ReturnType<
  typeof fetchInformationWithCardIdUseCase
>;
export const fetchInformationWithCardIdUseCase =
  (informationRepository: IInformationRepository) =>
  async (cardID: string): Promise<FetchInformationData | null> => {
    return await informationRepository.fetch(cardID);
  };
