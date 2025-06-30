"use server";
import {
  DatabaseOperationError,
  InputParseError,
} from "@/core/_domain/errors/common.error";
import { IContactWithPaginationResponse } from "@/core/_domain/types/contact-repository.types";
import { IRawSearchParams } from "@/core/_domain/types/search-params-handler-service.type";
import buildDeleteContactController from "@/core/_factory/controller-factory/contact/build-delete-contact-controller";
import buildFetchContactsWithPaginationDataBySearchParamsController from "@/core/_factory/controller-factory/contact/build-fetch-contacts-with-pagination-data-by-search-params-controller";
import buildUpdateTagOrNoteController from "@/core/_factory/controller-factory/contact/build-update-tag-or-note-controller";
import { IUpdateTagOrNoteData } from "@/schema/contact/update-contact-or-delete.schema";
import { revalidatePath } from "next/cache";

export async function fetchContactsWithPaginationDataBySearchParamsAction(
  searchParam: IRawSearchParams,
  itemsPerPage: number
): Promise<{
  success: boolean;
  data: IContactWithPaginationResponse;
}> {
  try {
    const fetchBySearchParamsController =
      buildFetchContactsWithPaginationDataBySearchParamsController();
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

export interface IDeleteContactActionState {
  success: boolean;
  message: string;
}

export async function deleteContactAction(
  _prevState: IDeleteContactActionState,
  contactId: number
): Promise<IDeleteContactActionState> {
  try {
    const deleteContactController = buildDeleteContactController();
    await deleteContactController(contactId);
    revalidatePath("/contact/connection");
    return {
      success: true,
      message: "Contact deleted successfully.",
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

export interface IUpdateTagOrNoteActionState {
  success: boolean;
  message: string;
}

export async function updateTagOrNoteAction(
  _prevState: IDeleteContactActionState,
  data: IUpdateTagOrNoteData
): Promise<IDeleteContactActionState> {
  try {
    const updateTagOrNoteController = buildUpdateTagOrNoteController();
    await updateTagOrNoteController(data);
    revalidatePath("/contact/connection");
    return {
      success: true,
      message: "Info updated Successfully.",
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
