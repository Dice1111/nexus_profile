import {
  DatabaseOperationError,
  InputParseError,
} from "@/core/domain/errors/common.error";
import { IFlatContactWithPaginationData } from "@/core/domain/repositories/types/contact.types";
import { IRawSearchParams } from "@/core/domain/services/types/search-params-handler-service.type";
import CreateFetchBySearchParamsController from "@/core/factory/di-factory/contact/create-fetch-by-search-params-controller";

export async function ConnectionAction(searchParam: IRawSearchParams): Promise<{
  success: boolean;
  data: IFlatContactWithPaginationData;
}> {
  try {
    const fetchBySearchParamsController = CreateFetchBySearchParamsController();
    const data = await fetchBySearchParamsController(searchParam);
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    if (error instanceof InputParseError) {
      return {
        success: false,
        data: { contacts: [], currentPage: 0, totalPage: 0 },
      };
    }

    if (error instanceof DatabaseOperationError) {
      return {
        success: false,
        data: { contacts: [], currentPage: 0, totalPage: 0 },
      };
    }
    return {
      success: false,
      data: { contacts: [], currentPage: 0, totalPage: 0 },
    };
  }
}
