import { SearchParamsHandlerService } from "@/core/application/services/search-params-handler.service";
import { fetchRequestsWithSpecificCardDataBySearchParamsUseCase } from "@/core/application/use-cases/request/fetch-requests-with-specific-card-data-by-search-params.use-case";
import { fetchTotalRequestCountBySearchParamsUseCase } from "@/core/application/use-cases/request/fetch-total-request-count-by-search-params.use-case";
import { fetchRequestWithPaginationDataBySearchParamsController } from "@/core/controllers/request/fetch-requests-with-pagination-data-by-search-params.controller";
import { RequestRepository } from "@/core/infrastructure/models/request.repository";

export default function CreateFetchRequestsWithPaginationDataBySearchParamsController() {
  const repository = new RequestRepository();
  const searchParamsHandlerService = new SearchParamsHandlerService();
  const fetchContactUseCase =
    fetchRequestsWithSpecificCardDataBySearchParamsUseCase(repository);
  const fetchTotalCountUseCase =
    fetchTotalRequestCountBySearchParamsUseCase(repository);
  return fetchRequestWithPaginationDataBySearchParamsController(
    fetchContactUseCase,
    fetchTotalCountUseCase,
    searchParamsHandlerService
  );
}
