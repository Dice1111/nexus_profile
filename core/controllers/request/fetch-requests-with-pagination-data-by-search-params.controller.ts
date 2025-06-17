import { IFetchRequestsWithSpecificCardDataBySearchParamsUseCase } from "@/core/application/use-cases/request/fetch-requests-with-specific-card-data-by-search-params.use-case";
import { ISearchParamsHandlerService } from "@/core/domain/services/ISearchParamsHandler.service";
import { IRawSearchParams } from "@/core/domain/services/types/search-params-handler-service.type";

export const fetchRequestWithPaginationDataBySearchParams =
  (
    fetchRequestsWithSpecificCardDataBySearchParamsUseCase: IFetchRequestsWithSpecificCardDataBySearchParamsUseCase,
    searchParamsHandlerService: ISearchParamsHandlerService
  ) =>
  async (
    rawSearchParams: IRawSearchParams,
    itemsPerPage: number
  ): Promise<> => {
    const parsedSearchParams =
      searchParamsHandlerService.parseSearchParams(rawSearchParams);
    const sanitizedSearchParams =
      searchParamsHandlerService.sanitizeRawSearchParams(parsedSearchParams);

    // const flatContactWithPaginationData =
    //   fetchRequestsWithSpecificCardDataBySearchParamsUseCase(
    //     sanitizedSearchParams,
    //     itemsPerPage
    //   );

    return flatContactWithPaginationData;
  };
