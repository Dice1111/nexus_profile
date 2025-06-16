import { SearchParamsHandlerService } from "@/core/application/services/search-params-handler.service";
import { fetchContactsBySearchParamsUseCase } from "@/core/application/use-cases/contact/fetch-contacts-by-search-params-use-case";
import { fetchContactsBySearchParamsController } from "@/core/controllers/contact/fetch-contacts-by-search-params.controller";
import { ContactRepository } from "@/core/infrastructure/models/contact.repository";

export default function CreateFetchBySearchParamsController() {
  const repository = new ContactRepository();
  const searchParamsHandlerService = new SearchParamsHandlerService();
  const usecase = fetchContactsBySearchParamsUseCase(repository);
  return fetchContactsBySearchParamsController(
    usecase,
    searchParamsHandlerService
  );
}
