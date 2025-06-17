import { IContactFilter } from "../services/types/search-params-handler-service.type";
import {
  IOrganizedSearchParams,
  IRawContactWithSpecificCardData,
} from "./types/contact.types";

export interface IContactRepository {
  fetchWithSpecificCardDataBySearchParams(
    data: IOrganizedSearchParams
  ): Promise<IRawContactWithSpecificCardData[]>;

  fetchTotalCountBySearchParams(data: IContactFilter): Promise<number>;
}
