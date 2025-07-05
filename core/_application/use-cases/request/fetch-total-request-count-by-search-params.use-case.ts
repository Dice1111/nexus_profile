import { IRequestRepository } from "@/core/_domain/repositories/IRequestRepository";
import { IAuthenticationService } from "@/core/_domain/services/IAuthentication.service";

import {
  IRequestFilter,
  ISanitizedRequestSearchParams,
} from "@/core/_domain/types/search-params-handler-service.type";

export type FetchTotalRequestCountBySearchParamsUseCase = ReturnType<
  typeof fetchTotalRequestCountBySearchParamsUseCase
>;

export const fetchTotalRequestCountBySearchParamsUseCase =
  (
    requestRepository: IRequestRepository,
    authservice: IAuthenticationService
  ) =>
  async (
    sanitizedSearchParams: ISanitizedRequestSearchParams
  ): Promise<number> => {
    const whereClauseRequirement: IRequestFilter = {
      userId: await authservice.getSession(),
      cardId: sanitizedSearchParams.cardId,
      keyword: sanitizedSearchParams.search,
    };

    const totalRequestCount =
      await requestRepository.fetchTotalCountBySearchParams(
        whereClauseRequirement
      );

    return totalRequestCount;
  };
