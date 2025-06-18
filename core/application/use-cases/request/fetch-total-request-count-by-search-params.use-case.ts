import { IRequestRepository } from "@/core/domain/repositories/IRequestRepository";

import {
  IRequestFilter,
  ISanitizedRequestSearchParams,
} from "@/core/domain/services/types/search-params-handler-service.type";

export type IFetchTotalRequestCountBySearchParamsUseCase = ReturnType<
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
