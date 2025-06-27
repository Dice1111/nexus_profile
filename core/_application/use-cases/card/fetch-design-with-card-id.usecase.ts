import { DesignModel } from "@/core/_domain/models/design.model";
import { IDesignRepository } from "@/core/_domain/repositories/IDesignRepository";
import { IFetchDesignData } from "@/core/_domain/types/design-repository.types";

export type IFetchDesignWithCardIdUseCase = ReturnType<
  typeof fetchDesignWithCardIdUseCase
>;

export const fetchDesignWithCardIdUseCase =
  (designRepository: IDesignRepository) =>
  async (cardID: string): Promise<IFetchDesignData | null> => {
    return await designRepository.fetch(cardID);
  };
