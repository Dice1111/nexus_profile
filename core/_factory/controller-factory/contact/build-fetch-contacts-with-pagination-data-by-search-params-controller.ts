import { SearchParamsHandlerService } from "@/core/_application/services/search-params-handler.service";
import { fetchContactsWithSpecificCardDataBySearchParamsUseCase } from "@/core/_application/use-cases/contact/fetch-contacts-with-specific-card-data-by-search-params.use-case";
import { fetchTotalContactCountBySearchParamsUseCase } from "@/core/_application/use-cases/contact/fetch-total-contact-count-by-search-params.use-case";
import { fetchContactsWithPaginationDataBySearchParamsController } from "@/core/_controllers/contact/fetch-contacts-with-pagination-data-by-search-params.controller";
import { ContactRepository } from "@/core/_infrastructure/repositories/contact.repository";

export default function buildFetchContactsWithPaginationDataBySearchParamsController() {
  const repository = new ContactRepository();

  const searchParamsHandlerService = new SearchParamsHandlerService();

  const fetchContactUseCase =
    fetchContactsWithSpecificCardDataBySearchParamsUseCase(repository);
  const fetchTotalCountUseCase =
    fetchTotalContactCountBySearchParamsUseCase(repository);

  return fetchContactsWithPaginationDataBySearchParamsController(
    fetchContactUseCase,
    fetchTotalCountUseCase,
    searchParamsHandlerService
  );
}
