import { IRequestRepository } from "@/core/domain/repositories/IRequestRepository";
import {
  IRawRequestWithSpecificCardData,
  IRequestWithSpecificCardData,
} from "@/core/domain/repositories/types/request.type";
import {
  IRequestFilter,
  IRequestSort,
  ISanitizedRequestSearchParams,
} from "@/core/domain/services/types/search-params-handler-service.type";

function ToFlatRequest(
  requests: IRawRequestWithSpecificCardData[]
): IRequestWithSpecificCardData[] {
  return requests.map((request) => {
    const info = request.SenderCard?.Information;

    return {
      id: request.id,
      cardId: request.cardId,
      senderCardId: request.senderCardId,
      createdAt: request.createdAt.toISOString(),
      updatedAt: request.updatedAt.toISOString(),
      occupation: info?.occupation ?? null,
      company: info?.company ?? null,
      fullName: info?.fullName ?? "No Name",
    };
  });
}

export type IFetchRequestsWithSpecificCardDataBySearchParamsUseCase =
  ReturnType<typeof fetchRequestsWithSpecificCardDataBySearchParamsUseCase>;

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

    const rawContactData =
      await requestRepository.fetchWithSpecificCardDataBySearchParams({
        itemsPerPage,
        requestPage,
        whereClauseRequirement,
        sortClauseRequirement,
      });

    return ToFlatRequest(rawContactData);
  };
