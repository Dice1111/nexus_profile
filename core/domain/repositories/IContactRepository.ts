import { IOrganizedSearchParams, IRawContact } from "./types/contact.types";

export interface IContactRepository {
  fetchBySearchParams(data: IOrganizedSearchParams): Promise<IRawContact[]>;
}
