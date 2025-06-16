import { IFetchContactsBySearchParamsUseCase } from "@/core/application/use-cases/contact/fetch-contacts-by-search-params-use-case";
import { IFlatContactWithPaginationData } from "@/core/domain/repositories/types/contact.types";
import { ISearchParamsHandlerService } from "@/core/domain/services/ISearchParamsHandler.service";
import { IRawSearchParams } from "@/core/domain/services/types/search-params-handler-service.type";

export const fetchContactsBySearchParamsController =
  (
    fetchContactsBySearchParamsUseCase: IFetchContactsBySearchParamsUseCase,
    searchParamsHandlerService: ISearchParamsHandlerService
  ) =>
  async (
    rawSearchParams: IRawSearchParams
  ): Promise<IFlatContactWithPaginationData> => {
    const parsedSearchParams =
      searchParamsHandlerService.parseSearchParams(rawSearchParams);
    const sanitizedSearchParams =
      searchParamsHandlerService.sanitizeRawSearchParams(parsedSearchParams);
    const flatContactWithPaginationData = fetchContactsBySearchParamsUseCase(
      sanitizedSearchParams
    );

    return flatContactWithPaginationData;
  };
