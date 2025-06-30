import { IRequestRepository } from "@/core/_domain/repositories/IRequestRepository";
import {
  IRequestFilter,
  IRequestSort,
  ISanitizedRequestSearchParams,
} from "@/core/_domain/types/search-params-handler-service.type";

export type FetchRequestsWithSpecificCardDataBySearchParamsUseCase = ReturnType<
  typeof fetchRequestsWithSpecificCardDataBySearchParamsUseCase
>;

export const fetchRequestsWithSpecificCardDataBySearchParamsUseCase =
  (requestRepository: IRequestRepository) =>
  async (
    sanitizedSearchParams: ISanitizedRequestSearchParams,
    itemsPerPage: number
  ) => {
    const whereClauseRequirement: IRequestFilter = {
      cardId: sanitizedSearchParams.cardId,
      keyword: sanitizedSearchParams.search,
    };

    const sortClauseRequirement: IRequestSort = {
      item: sanitizedSearchParams.sortItem,
      order: sanitizedSearchParams.sortOrder,
    };

    const requestPage = sanitizedSearchParams.page;

    const requestData =
      await requestRepository.fetchWithSpecificCardDataBySearchParams({
        itemsPerPage,
        requestPage,
        whereClauseRequirement,
        sortClauseRequirement,
      });

    return requestData;
  };
