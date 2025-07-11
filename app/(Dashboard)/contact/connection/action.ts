"use server";
import {
  DatabaseOperationError,
  InputParseError,
} from "@/core/_domain/errors/common.error";
import { CardWithTitleAndID } from "@/core/_domain/types/card-repository.types";
import { IContactWithPaginationResponse } from "@/core/_domain/types/contact-repository.types";
import { IRawSearchParams } from "@/core/_domain/types/search-params-handler-service.type";
import { buildCardIdAndTitleByCardIdController } from "@/core/_factory/controller-factory/card/build-card-id-and-title-by-card-id-controller";
import buildDeleteContactController from "@/core/_factory/controller-factory/contact/build-delete-contact-controller";
import buildFetchContactsWithPaginationDataBySearchParamsController from "@/core/_factory/controller-factory/contact/build-fetch-contacts-with-pagination-data-by-search-params-controller";
import buildUpdateTagOrNoteController from "@/core/_factory/controller-factory/contact/build-update-tag-or-note-controller";
import { IUpdateTagOrNoteData } from "@/schema/contact/update-contact-or-delete.schema";
import { revalidatePath } from "next/cache";

export async function fetchCardIdandTitleByUserIdAction(): Promise<{
  success: boolean;
  data: CardWithTitleAndID[];
}> {
  try {
    const fetchCardIdandTitleByUserIdController =
      buildCardIdAndTitleByCardIdController();
    const data = await fetchCardIdandTitleByUserIdController();
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    if (error instanceof DatabaseOperationError) {
      throw error;
    } else {
      throw error;
    }
  }
}

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
      throw error;
    } else if (error instanceof DatabaseOperationError) {
      throw error;
    } else {
      throw error;
    }
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
    } else if (error instanceof DatabaseOperationError) {
      return {
        success: false,
        message: "Something went wrong",
      };
    } else {
      throw error;
    }
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
    } else if (error instanceof DatabaseOperationError) {
      return {
        success: false,
        message: "Something went wrong",
      };
    } else {
      throw error;
    }
  }
}
