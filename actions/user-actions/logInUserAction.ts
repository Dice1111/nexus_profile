"use server";

import { authenticateUserUseCase } from "@/use-cases/user/authenticateUserUseCase";

export async function logInUserAction(
  _prevState: {
    success: boolean;
    message: string;
  },
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await authenticateUserUseCase({ email, password });

    return {
      success: true,
      message: "Login Success",
    };
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error ? error.message : "Something went wrong.";
    return {
      success: false,
      message: message,
    };
  }
}
