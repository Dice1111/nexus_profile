import { DesignModel } from "@/core/_domain/models/design.model";
import { IDesignRepository } from "@/core/_domain/repositories/IDesignRepository";
import { FetchDesignData } from "@/core/_domain/types/design-repository.types";

export type IFetchDesignWithCardIdUseCase = ReturnType<
  typeof fetchDesignWithCardIdUseCase
>;

export const fetchDesignWithCardIdUseCase =
  (designRepository: IDesignRepository) =>
  async (cardID: string): Promise<FetchDesignData | null> => {
    return await designRepository.fetch(cardID);
  };
