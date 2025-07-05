import { SearchParamsHandlerService } from "@/core/_application/services/search-params-handler.service";
import { fetchRequestsWithSpecificCardDataBySearchParamsUseCase } from "@/core/_application/use-cases/request/fetch-requests-with-specific-card-data-by-search-params.use-case";
import { fetchTotalRequestCountBySearchParamsUseCase } from "@/core/_application/use-cases/request/fetch-total-request-count-by-search-params.use-case";
import { fetchRequestWithPaginationDataBySearchParamsController } from "@/core/_controllers/request/fetch-requests-with-pagination-data-by-search-params.controller";
import { RequestRepository } from "@/core/_infrastructure/repositories/request.repository";
import { AuthenticationService } from "@/core/_infrastructure/services/authentication.service";

export default function buildFetchRequestsWithPaginationDataBySearchParamsController() {
  const repository = new RequestRepository();
  const searchParamsHandlerService = new SearchParamsHandlerService();
  const authservice = new AuthenticationService();
  const fetchContactUseCase =
    fetchRequestsWithSpecificCardDataBySearchParamsUseCase(
      repository,
      authservice
    );
  const fetchTotalCountUseCase = fetchTotalRequestCountBySearchParamsUseCase(
    repository,
    authservice
  );
  return fetchRequestWithPaginationDataBySearchParamsController(
    fetchContactUseCase,
    fetchTotalCountUseCase,
    searchParamsHandlerService
  );
}
