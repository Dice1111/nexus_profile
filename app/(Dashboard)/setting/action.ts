"use server";

import {
  DatabaseOperationError,
  InputParseError,
} from "@/core/_domain/errors/common.error";
import { UserSettingResponse } from "@/core/_domain/types/user-repository.types";
import { buildFetchUserSettingDataController } from "@/core/_factory/controller-factory/user/build-fetch-user-setting-data-by-id-controller";
import { buildUpdateUsernameController } from "@/core/_factory/controller-factory/user/build-update-username-controller";
import { UpdateUsernameData } from "@/schema/user/update-username.schema";
import { revalidatePath } from "next/cache";

export interface IFetchUserSettingDataActionState {
  success: boolean;
  data: UserSettingResponse;
}

export async function fetchUserSettingDataAction(): Promise<IFetchUserSettingDataActionState> {
  try {
    const fetchUserSettingDataByIdController =
      buildFetchUserSettingDataController();
    const data = await fetchUserSettingDataByIdController();

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    throw error;
  }
}

export interface IUpdateUsernameActionState {
  success: boolean;
  message: string;
}

export async function updateUsernameAction(
  _prevState: IUpdateUsernameActionState,
  data: UpdateUsernameData
): Promise<IUpdateUsernameActionState> {
  try {
    const updateUsernameController = buildUpdateUsernameController();
    await updateUsernameController(data);
    revalidatePath("/setting");
    return {
      success: true,
      message: "Name Updated Successfully.",
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
