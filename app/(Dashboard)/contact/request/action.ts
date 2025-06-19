import {
  DatabaseOperationError,
  InputParseError,
} from "@/core/domain/errors/common.error";
import { IRequestWithPaginationData } from "@/core/domain/repositories/types/request.type";
import { IRawSearchParams } from "@/core/domain/services/types/search-params-handler-service.type";
import CreateFetchRequestsWithPaginationDataBySearchParamsController from "@/core/factory/di-factory/request/create-fetch-requests-with-pagination-data-by-search-params-controller";

export async function ContactRequestAction(
  searchParam: IRawSearchParams,
  itemsPerPage: number
): Promise<{
  success: boolean;
  data: IRequestWithPaginationData;
}> {
  try {
    const fetchBySearchParamsController =
      CreateFetchRequestsWithPaginationDataBySearchParamsController();
    const data = await fetchBySearchParamsController(searchParam, itemsPerPage);
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    if (error instanceof InputParseError) {
      return {
        success: false,
        data: { requests: [], totalCount: 0, currentPage: 0, totalPage: 0 },
      };
    }

    if (error instanceof DatabaseOperationError) {
      return {
        success: false,
        data: { requests: [], totalCount: 0, currentPage: 0, totalPage: 0 },
      };
    }
    return {
      success: false,
      data: { requests: [], totalCount: 0, currentPage: 0, totalPage: 0 },
    };
  }
}
