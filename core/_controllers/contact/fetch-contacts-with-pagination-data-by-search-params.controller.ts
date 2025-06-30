import { FetchContactsWithSpecificCardDataBySearchParamsUseCase } from "@/core/_application/use-cases/contact/fetch-contacts-with-specific-card-data-by-search-params.use-case";
import { FetchTotalContactCountBySearchParamsUseCase } from "@/core/_application/use-cases/contact/fetch-total-contact-count-by-search-params.use-case";
import { ISearchParamsHandlerService } from "@/core/_domain/services/ISearchParamsHandler.service";
import { IContactWithPaginationResponse } from "@/core/_domain/types/contact-repository.types";
import { IRawSearchParams } from "@/core/_domain/types/search-params-handler-service.type";

export const fetchContactsWithPaginationDataBySearchParamsController =
  (
    fetchContactsWithSpecificCardDataBySearchParamsUseCase: FetchContactsWithSpecificCardDataBySearchParamsUseCase,
    fetchTotalContactCountBySearchParamsUseCase: FetchTotalContactCountBySearchParamsUseCase,
    searchParamsHandlerService: ISearchParamsHandlerService
  ) =>
  async (
    rawSearchParams: IRawSearchParams,
    itemsPerPage: number
  ): Promise<IContactWithPaginationResponse> => {
    const parsedSearchParams =
      searchParamsHandlerService.parseSearchParams(rawSearchParams);
    const sanitizedSearchParams =
      searchParamsHandlerService.sanitizeRawSearchParamsForContact(
        parsedSearchParams
      );

    const [contacts, totalCount] = await Promise.all([
      fetchContactsWithSpecificCardDataBySearchParamsUseCase(
        sanitizedSearchParams,
        itemsPerPage
      ),
      fetchTotalContactCountBySearchParamsUseCase(sanitizedSearchParams),
    ]);

    const totalPage = Math.ceil(totalCount / itemsPerPage);
    const currentPage = sanitizedSearchParams.page;

    return {
      contacts,
      totalCount,
      totalPage,
      currentPage,
    };
  };
