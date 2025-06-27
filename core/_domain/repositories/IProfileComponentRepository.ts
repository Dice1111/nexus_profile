import { ProfileComponentModel } from "../models/profile-component.model";

export interface IProfileComponentRepository {
  create(): Promise<void>;
  update(): Promise<void>;
  delete(): Promise<void>;
  fetch(cardID: string): Promise<ProfileComponentModel[]>;
}
