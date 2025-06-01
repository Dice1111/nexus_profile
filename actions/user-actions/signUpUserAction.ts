"use server";

import { createUserUseCase } from "@/use-cases/user/createUserUseCase";

export async function signUpUserAction(
  _prevState: {
    success: boolean;
    message: string;
  },
  formData: FormData
) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await createUserUseCase({ name, email, password });

    return {
      success: true,
      message: "User account created successful",
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
