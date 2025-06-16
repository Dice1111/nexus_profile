import { FetchContactsBySearchParamsUseCase } from "@/core/application/use-cases/contact/fetch-contacts-by-search-params-use-case";
import { ISearchParamsHandlerService } from "@/core/domain/services/ISearchParamsHandler.service";
import { IRawSearchParams } from "@/core/domain/services/types/search-params-handler-service.type";

export const fetchContactsBySearchParamsController =
  (
    fetchContactsBySearchParamsUseCase: FetchContactsBySearchParamsUseCase,
    searchParamsHandler: ISearchParamsHandlerService
  ) =>
  async (data: IRawSearchParams) => {
    const sanitizedSearchParams =
      searchParamsHandler.sanitizeRawSearchParams(data);

    const contactData = fetchContactsBySearchParamsUseCase(
      sanitizedSearchParams
    );

    return contactData;
  };
