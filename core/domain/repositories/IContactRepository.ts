import { IContactFilter } from "../services/types/search-params-handler-service.type";
import {
  IContactOrganizedSearchParams,
  IRawContactWithSpecificCardData,
} from "./types/contact.types";

export interface IContactRepository {
  fetchWithSpecificCardDataBySearchParams(
    data: IContactOrganizedSearchParams
  ): Promise<IRawContactWithSpecificCardData[]>;

  fetchTotalCountBySearchParams(data: IContactFilter): Promise<number>;
}
