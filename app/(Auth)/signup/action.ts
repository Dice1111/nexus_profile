"use server";

import { SignUpControllerType } from "@/core/_controllers/auth/sign-up.controller";
import {
  DatabaseOperationError,
  InputParseError,
  UniqueConstraintError,
} from "@/core/_domain/errors/common.error";
import createSignUpController from "@/core/_factory/controller-factory/auth/create-sign-up-controller";
import { SignUpInputType } from "@/schema/auth/sign-up.schema";

export async function signUpUserAction(
  _prevState: {
    success: boolean;
    message: string;
  },
  data: SignUpInputType
) {
  try {
    const signUpController: SignUpControllerType = createSignUpController();
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
