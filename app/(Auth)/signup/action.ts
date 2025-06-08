"use server";

export async function signUpUserAction(
  _prevState: {
    success: boolean;
    message: string;
  },
  formData: FormData
) {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  try {
    // await createUserUseCase({ name, email, password });

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
