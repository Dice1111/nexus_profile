import {
  DatabaseOperationError,
  InputParseError,
} from "@/core/domain/errors/common.error";
import { IContactWithPaginationData } from "@/core/domain/repositories/types/contact.types";
import { IRawSearchParams } from "@/core/domain/services/types/search-params-handler-service.type";
import CreateFetchContactsWithPaginationDataBySearchParamsController from "@/core/factory/di-factory/contact/create-fetch-contacts-with-pagination-data-by-search-params-controller";

export async function ContactConnectionAction(
  searchParam: IRawSearchParams,
  itemsPerPage: number
): Promise<{
  success: boolean;
  data: IContactWithPaginationData;
}> {
  try {
    const fetchBySearchParamsController =
      CreateFetchContactsWithPaginationDataBySearchParamsController();
    const data = await fetchBySearchParamsController(searchParam, itemsPerPage);
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    if (error instanceof InputParseError) {
      return {
        success: false,
        data: { contacts: [], totalCount: 0, currentPage: 0, totalPage: 0 },
      };
    }

    if (error instanceof DatabaseOperationError) {
      return {
        success: false,
        data: { contacts: [], totalCount: 0, currentPage: 0, totalPage: 0 },
      };
    }
    return {
      success: false,
      data: { contacts: [], totalCount: 0, currentPage: 0, totalPage: 0 },
    };
  }
}
