import {
  CardWithTitleAndID,
  CardWithInformationAndDesignData,
} from "../types/card-repository.types";

export interface ICardRepository {
  create: () => Promise<void>;
  update: (cardId: string) => Promise<void>;
  delete: (cardId: string) => Promise<void>;
  fetchByUserID: (userID: string) => Promise<CardWithTitleAndID[]>;
  fetchWithInformationAndDesignByUserID: (
    userId: string
  ) => Promise<CardWithInformationAndDesignData[]>;
}
