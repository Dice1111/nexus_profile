import { FetchRequestsWithSpecificCardDataBySearchParamsUseCase } from "@/core/_application/use-cases/request/fetch-requests-with-specific-card-data-by-search-params.use-case";
import { FetchTotalRequestCountBySearchParamsUseCase } from "@/core/_application/use-cases/request/fetch-total-request-count-by-search-params.use-case";
import { IRequestWithPaginationData } from "@/core/_domain/types/request-repository.type";
import { ISearchParamsHandlerService } from "@/core/_domain/services/ISearchParamsHandler.service";
import { IRawSearchParams } from "@/core/_domain/types/search-params-handler-service.type";

export const fetchRequestWithPaginationDataBySearchParamsController =
  (
    fetchRequestsWithSpecificCardDataBySearchParamsUseCase: FetchRequestsWithSpecificCardDataBySearchParamsUseCase,
    fetchTotalRequestCountBySearchParamsUseCase: FetchTotalRequestCountBySearchParamsUseCase,
    searchParamsHandlerService: ISearchParamsHandlerService
  ) =>
  async (
    rawSearchParams: IRawSearchParams,
    itemsPerPage: number
  ): Promise<IRequestWithPaginationData> => {
    const parsedSearchParams =
      searchParamsHandlerService.parseSearchParams(rawSearchParams);
    const sanitizedSearchParams =
      searchParamsHandlerService.sanitizeRawSearchParamsForRequest(
        parsedSearchParams
      );

    const [requests, totalCount] = await Promise.all([
      fetchRequestsWithSpecificCardDataBySearchParamsUseCase(
        sanitizedSearchParams,
        itemsPerPage
      ),
      fetchTotalRequestCountBySearchParamsUseCase(sanitizedSearchParams),
    ]);

    const totalPage = Math.ceil(totalCount / itemsPerPage);
    const currentPage = sanitizedSearchParams.page;

    return {
      requests,
      totalCount,
      totalPage,
      currentPage,
    };
  };
