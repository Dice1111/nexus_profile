import {
  DatabaseOperationError,
  InputParseError,
} from "@/core/_domain/errors/common.error";
import { IContactWithPaginationData } from "@/core/_domain/repositories/types/contact.types";
import { IRawSearchParams } from "@/core/_domain/services/types/search-params-handler-service.type";
import createFetchContactsWithPaginationDataBySearchParamsController from "@/core/_factory/controller-factory/contact/create-fetch-contacts-with-pagination-data-by-search-params-controller";

export async function ContactConnectionAction(
  searchParam: IRawSearchParams,
  itemsPerPage: number
): Promise<{
  success: boolean;
  data: IContactWithPaginationData;
}> {
  try {
    const fetchBySearchParamsController =
      createFetchContactsWithPaginationDataBySearchParamsController();
    const data = await fetchBySearchParamsController(searchParam, itemsPerPage);
    console.log(data);
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
