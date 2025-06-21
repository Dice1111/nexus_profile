"use server";
import {
  DatabaseOperationError,
  InputParseError,
  UniqueConstraintError,
} from "@/core/_domain/errors/common.error";
import { IRequestWithPaginationData } from "@/core/_domain/repositories/types/request.type";
import { IRawSearchParams } from "@/core/_domain/services/types/search-params-handler-service.type";
import buildAcceptRequestController from "@/core/_factory/controller-factory/request/build-accept-request-controller";
import buildDeleteRequestController from "@/core/_factory/controller-factory/request/build-delete-request-controller";
import buildFetchRequestsWithPaginationDataBySearchParamsController from "@/core/_factory/controller-factory/request/build-fetch-requests-with-pagination-data-by-search-params-controller";
import { IAcceptRequestData } from "@/schema/request/accept-request.schema";
import { revalidatePath } from "next/cache";

export async function fetchRequestWithPaginationDataAction(
  searchParam: IRawSearchParams,
  itemsPerPage: number
): Promise<{
  success: boolean;
  data: IRequestWithPaginationData;
}> {
  try {
    const fetchBySearchParamsController =
      buildFetchRequestsWithPaginationDataBySearchParamsController();
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

export interface IAcceptRequestActionState {
  success: boolean;
  message: string;
}

export async function acceptRequestAction(
  _prevState: IAcceptRequestActionState,
  data: IAcceptRequestData
): Promise<IAcceptRequestActionState> {
  try {
    const acceptRequestController = buildAcceptRequestController();
    await acceptRequestController(data);
    revalidatePath("/contact/request");
    return {
      success: true,
      message: "Contact saved successfully.",
    };
  } catch (error) {
    if (error instanceof InputParseError) {
      return {
        success: false,
        message: error.message,
      };
    }

    if (error instanceof UniqueConstraintError) {
      return {
        success: false,
        message: error.message,
      };
    }

    if (error instanceof DatabaseOperationError) {
      return {
        success: false,
        message: error.message,
      };
    }
    return {
      success: false,
      message: "An error happened. Please try again later",
    };
  }
}

export interface IDeleteRequestActionState {
  success: boolean;
  message: string;
}

export async function deleteRequestAction(
  _prevState: IDeleteRequestActionState,
  requestId: number
): Promise<IDeleteRequestActionState> {
  try {
    const deleteRequestController = buildDeleteRequestController();
    await deleteRequestController(requestId);
    revalidatePath("/contact/request");
    return {
      success: true,
      message: "Request deleted successfully.",
    };
  } catch (error) {
    if (error instanceof InputParseError) {
      return {
        success: false,
        message: error.message,
      };
    }

    if (error instanceof DatabaseOperationError) {
      return {
        success: false,
        message: error.message,
      };
    }
    return {
      success: false,
      message: "An error happened. Please try again later",
    };
  }
}
