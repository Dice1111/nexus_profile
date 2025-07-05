import { IRequestRepository } from "@/core/_domain/repositories/IRequestRepository";
import { IAuthenticationService } from "@/core/_domain/services/IAuthentication.service";
import {
  IRequestFilter,
  IRequestSort,
  ISanitizedRequestSearchParams,
} from "@/core/_domain/types/search-params-handler-service.type";

export type FetchRequestsWithSpecificCardDataBySearchParamsUseCase = ReturnType<
  typeof fetchRequestsWithSpecificCardDataBySearchParamsUseCase
>;

export const fetchRequestsWithSpecificCardDataBySearchParamsUseCase =
  (
    requestRepository: IRequestRepository,
    authservice: IAuthenticationService
  ) =>
  async (
    sanitizedSearchParams: ISanitizedRequestSearchParams,
    itemsPerPage: number
  ) => {
    const whereClauseRequirement: IRequestFilter = {
      userId: await authservice.getSession(),
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
