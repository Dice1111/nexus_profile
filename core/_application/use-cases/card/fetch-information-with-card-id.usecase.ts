import { InformationModel } from "@/core/_domain/models/information.model";
import { IInformationRepository } from "@/core/_domain/repositories/IInformationRepository";

export type IFetchInformationWithCardIdUseCase = ReturnType<
  typeof fetchInformationWithCardIdUseCase
>;
export const fetchInformationWithCardIdUseCase =
  (informationRepository: IInformationRepository) =>
  async (cardID: string): Promise<InformationModel> => {
    return await informationRepository.fetch(cardID);
  };
