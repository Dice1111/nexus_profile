"use server";

import {
  DatabaseOperationError,
  InputParseError,
  UniqueConstraintError,
} from "@/core/domain/errors/common.error";
import CreateSignUpController from "@/core/factory/di-factory/auth/create-sign-up-controller";
import { SignUpControllerType } from "@/core/controllers/auth/sign-up.controller";
import { SignUpInputType } from "@/schema/auth/sign-up.schema";

export async function signUpUserAction(
  _prevState: {
    success: boolean;
    message: string;
  },
  data: SignUpInputType
) {
  try {
    const signUpController: SignUpControllerType = CreateSignUpController();
    await signUpController(data);
    return {
      success: true,
      message: "User account created successful",
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
