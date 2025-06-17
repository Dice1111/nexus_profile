import { IOrganizedSearchParams } from "./types/contact.types";

export interface IRequestRepository {
  fetchWithSpecificCardDataBySearchParams(
    data: IOrganizedSearchParams
  ): Promise<IRawContactWithSpecificCardData[]>;

  fetchTotalCountBySearchParams(data: IContactFilter): Promise<number>;
}
