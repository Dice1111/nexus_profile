"use server";

import { AuthenticationError } from "@/core/domain/errors/auth.error";
import {
  DatabaseOperationError,
  InputParseError,
} from "@/core/domain/errors/common.error";
import CreateSignInController from "@/core/factory/di-factory/auth/create-sign-in-controller";
import { SignInControllerType } from "@/core/interface-adapters/controllers/auth/sign-in.controller";
import { SignInInputType } from "@/schema/auth/sign-in.schema";

export async function signInUserAction(
  _prevState: {
    success: boolean;
    message: string;
  },
  data: SignInInputType
) {
  try {
    const signInController: SignInControllerType = CreateSignInController();
    await signInController(data);

    return {
      success: true,
      message: "Login Success",
    };
  } catch (error) {
    if (error instanceof InputParseError) {
      return {
        success: false,
        message: error.message,
      };
    }
    if (error instanceof AuthenticationError) {
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
