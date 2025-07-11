"use server";

import { SignUpControllerType } from "@/core/_controllers/user/sign-up.controller";
import {
  DatabaseOperationError,
  InputParseError,
  UniqueConstraintError,
} from "@/core/_domain/errors/common.error";
import buildSignUpController from "@/core/_factory/controller-factory/user/build-sign-up-controller";
import { SignUpData } from "@/schema/user/sign-up.schema";

export async function signUpUserAction(
  _prevState: {
    success: boolean;
    message: string;
  },
  data: SignUpData
) {
  try {
    const signUpController: SignUpControllerType = buildSignUpController();
    await signUpController(data);
    return {
      success: true,
      message: "Signup Success",
    };
  } catch (error) {
    if (error instanceof InputParseError) {
      return {
        success: false,
        message: error.message,
      };
    } else if (error instanceof UniqueConstraintError) {
      return {
        success: false,
        message: error.message,
      };
    } else if (error instanceof DatabaseOperationError) {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
    throw error;
  }
}
