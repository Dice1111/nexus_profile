import { FetchDesignData } from "../types/design-repository.types";

export interface IDesignRepository {
  create: () => Promise<void>;
  update: () => Promise<void>;
  delete: () => Promise<void>;
  fetch: (cardId: string) => Promise<FetchDesignData>;
}
