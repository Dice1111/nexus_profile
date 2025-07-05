import { IRequestFilter } from "../types/search-params-handler-service.type";
import {
  RequestWithSpecificCardData,
  IRequestOrganizedSearchParams,
} from "../types/request-repository.type";

export interface IRequestRepository {
  fetchWithSpecificCardDataBySearchParams(
    data: IRequestOrganizedSearchParams
  ): Promise<RequestWithSpecificCardData[]>;

  fetchTotalCountBySearchParams(data: IRequestFilter): Promise<number>;
  delete(requestId: number): Promise<void>;
  fetchTotalRequestCountByCardId(cardId: string[]): Promise<number>;
}
