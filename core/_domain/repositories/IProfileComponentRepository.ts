import { FetchProfileComponentData } from "../types/profile-component-repository.types";

export interface IProfileComponentRepository {
  create(): Promise<void>;
  update(): Promise<void>;
  delete(): Promise<void>;
  fetch(cardId: string): Promise<FetchProfileComponentData[]>;
}
