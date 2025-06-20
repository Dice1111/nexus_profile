"use server";

import { SignInControllerType } from "@/core/_controllers/auth/sign-in.controller";
import { AuthenticationError } from "@/core/_domain/errors/auth.error";
import {
  DatabaseOperationError,
  InputParseError,
} from "@/core/_domain/errors/common.error";
import buildSignInController from "@/core/_factory/controller-factory/auth/build-sign-in-controller";
import { SignInInputType } from "@/schema/auth/sign-in.schema";

export async function signInUserAction(
  _prevState: {
    success: boolean;
    message: string;
  },
  data: SignInInputType
) {
  try {
    const signInController: SignInControllerType = buildSignInController();
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
