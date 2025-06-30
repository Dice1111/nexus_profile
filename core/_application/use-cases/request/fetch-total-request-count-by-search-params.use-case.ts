import { IRequestRepository } from "@/core/_domain/repositories/IRequestRepository";

import {
  IRequestFilter,
  ISanitizedRequestSearchParams,
} from "@/core/_domain/types/search-params-handler-service.type";

export type FetchTotalRequestCountBySearchParamsUseCase = ReturnType<
  typeof fetchTotalRequestCountBySearchParamsUseCase
>;

export const fetchTotalRequestCountBySearchParamsUseCase =
  (requestRepository: IRequestRepository) =>
  async (
    sanitizedSearchParams: ISanitizedRequestSearchParams
  ): Promise<number> => {
    const whereClauseRequirement: IRequestFilter = {
      cardId: sanitizedSearchParams.cardId,
      keyword: sanitizedSearchParams.search,
    };

    const totalRequestCount =
      await requestRepository.fetchTotalCountBySearchParams(
        whereClauseRequirement
      );

    return totalRequestCount;
  };
