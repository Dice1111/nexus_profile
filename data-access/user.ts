import { prisma } from "@/lib/prisma-client";
import { User } from "@prisma/client";

interface createUserDTO {
  email: string;
  passwordHash: string;
  name: string;
}

interface findUserByEmailDTO {
  email: string;
}

interface userDTO {
  email: string;
  passwordHash: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export function toUserDTO(user: User): userDTO {
  return {
    name: user.name,
    email: user.email,
    passwordHash: user.passwordHash,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

export async function createUser({
  name,
  email,
  passwordHash,
}: createUserDTO): Promise<void> {
  try {
    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });
  } catch (error: any) {
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      throw new Error("Email is already taken.");
    }

    throw new Error("Failed to create user.");
  }
}

export async function findUserByEmail({
  email,
}: findUserByEmailDTO): Promise<userDTO | null> {
  try {
    const data = await prisma.user.findUnique({
      where: { email },
    });

    if (!data) return data;
    return toUserDTO(data);
  } catch (error: any) {
    throw new Error("Failed to find user.");
  }
}
