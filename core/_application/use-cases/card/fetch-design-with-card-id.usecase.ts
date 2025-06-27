import { DesignModel } from "@/core/_domain/models/design.model";
import { IDesignRepository } from "@/core/_domain/repositories/IDesignRepository";

export type IFetchDesignWithCardIdUseCase = ReturnType<
  typeof fetchDesignWithCardIdUseCase
>;

export const fetchDesignWithCardIdUseCase =
  (designRepository: IDesignRepository) =>
  async (cardID: string): Promise<DesignModel> => {
    return await designRepository.fetch(cardID);
  };
