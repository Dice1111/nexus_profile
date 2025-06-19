import { IContactFilter } from "../services/types/search-params-handler-service.type";
import {
  IContactOrganizedSearchParams,
  IRawContactWithSpecificCardData,
} from "./types/contact.types";
import { ICreateContactData } from "./types/request.type";

export interface IContactRepository {
  fetchWithSpecificCardDataBySearchParams(
    data: IContactOrganizedSearchParams
  ): Promise<IRawContactWithSpecificCardData[]>;

  fetchTotalCountBySearchParams(data: IContactFilter): Promise<number>;
  create(data: ICreateContactData): Promise<void>;
}
