"use server";

import { prisma } from "@/core/infrastructure/prisma/prisma-client";

export async function submitData(
  _prevState: { message: string },
  formData: FormData
) {
  try {
    const result = await prisma.user.create({
      data: {
        email: formData.get("email") as string,
        passwordHash: formData.get("password") as string,
        name: formData.get("name") as string,
      },
    });

    console.log(result);

    return { success: true, message: "User created successfully!" };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
