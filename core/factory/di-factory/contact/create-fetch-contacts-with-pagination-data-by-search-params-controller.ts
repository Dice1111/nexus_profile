import { SearchParamsHandlerService } from "@/core/application/services/search-params-handler.service";
import { fetchContactsWithSpecificCardDataBySearchParamsUseCase } from "@/core/application/use-cases/contact/fetch-contacts-with-specific-card-data-by-search-params.use-case";
import { fetchTotalContactCountBySearchParamsUseCase } from "@/core/application/use-cases/contact/fetch-total-contact-count-by-search-params.use-case";
import { fetchContactsWithPaginationDataBySearchParamsController } from "@/core/controllers/contact/fetch-contacts-with-pagination-data-by-search-params.controller";
import { ContactRepository } from "@/core/infrastructure/models/contact.repository";

export default function CreateFetchContactsWithPaginationDataBySearchParamsController() {
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
