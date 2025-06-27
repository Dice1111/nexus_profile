import { IInformationRepository } from "@/core/_domain/repositories/IInformationRepository";
import { IFetchInformationData } from "@/core/_domain/types/information-repository.types";

export type IFetchInformationWithCardIdUseCase = ReturnType<
  typeof fetchInformationWithCardIdUseCase
>;
export const fetchInformationWithCardIdUseCase =
  (informationRepository: IInformationRepository) =>
  async (cardID: string): Promise<IFetchInformationData | null> => {
    return await informationRepository.fetch(cardID);
  };
