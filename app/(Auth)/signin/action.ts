"use server";

import { SignInControllerType } from "@/core/_controllers/user/sign-in.controller";
import { AuthenticationError } from "@/core/_domain/errors/auth.error";
import {
  DatabaseOperationError,
  InputParseError,
  NotFoundError,
} from "@/core/_domain/errors/common.error";
import buildSignInController from "@/core/_factory/controller-factory/user/build-sign-in-controller";
import { SignInData } from "@/schema/user/sign-in.schema";

export async function signInUserAction(
  _prevState: {
    success: boolean;
    message: string;
  },
  data: SignInData
) {
  try {
    const signInController: SignInControllerType = buildSignInController();
    await signInController(data);

    return {
      success: true,
      message: "Signin Success",
    };
  } catch (error) {
    if (error instanceof InputParseError) {
      return {
        success: false,
        message: error.message,
      };
    } else if (error instanceof AuthenticationError) {
      return {
        success: false,
        message: error.message,
      };
    } else if (error instanceof NotFoundError) {
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
