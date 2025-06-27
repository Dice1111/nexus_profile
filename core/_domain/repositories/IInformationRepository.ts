import { IFetchInformationData } from "../types/information-repository.types";

export interface IInformationRepository {
  create: () => Promise<void>;
  update: () => Promise<void>;
  delete: () => Promise<void>;
  fetch: (cardId: string) => Promise<IFetchInformationData | null>;
}
