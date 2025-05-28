"use server";

import { prisma } from "@/lib/database/prisma-client";

export const submitData = async (formData: FormData) => {
  const result = await prisma.user.create({
    data: {
      email: formData.get("email") as string,
      passwordHash: formData.get("password") as string,
      name: formData.get("name") as string,
    },
  });

  console.log(result);
};
