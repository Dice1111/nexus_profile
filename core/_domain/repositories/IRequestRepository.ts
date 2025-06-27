import { IRequestFilter } from "../types/search-params-handler-service.type";
import {
  IRawRequestWithSpecificCardData,
  IRequestOrganizedSearchParams,
} from "../types/request-repository.type";

export interface IRequestRepository {
  fetchWithSpecificCardDataBySearchParams(
    data: IRequestOrganizedSearchParams
  ): Promise<IRawRequestWithSpecificCardData[]>;

  fetchTotalCountBySearchParams(data: IRequestFilter): Promise<number>;
  delete(requestId: number): Promise<void>;
  fetchTotalRequestCountByCardId(cardId: string): Promise<number>;
}
