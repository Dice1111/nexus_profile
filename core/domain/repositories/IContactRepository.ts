import {
  IOrganizedSearchParams,
  IRawContactWithPaginationData,
} from "./types/contact.types";

export interface IContactRepository {
  fetchBySearchParams(
    data: IOrganizedSearchParams
  ): Promise<IRawContactWithPaginationData>;
}
