import { Prisma } from "@prisma/client";
import {
  DatabaseOperationError,
  UniqueConstraintError,
} from "../../domain/errors/common.error";

import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { prisma } from "../prisma/prisma-client";
import { ICreateUserData } from "@/core/domain/repositories/types/user.types";
import { UserModel } from "@/core/domain/models/user.model";

export class UserRepository implements IUserRepository {
  async create(data: ICreateUserData): Promise<void> {
    try {
      await prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          passwordHash: data.passwordHash,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new UniqueConstraintError(
          "A user with this email already exists",
          { cause: error }
        );
      }
      throw new DatabaseOperationError("Failed to create user", {
        cause: error,
      });
    }
  }
  async findByEmail(email: string): Promise<UserModel | null> {
    try {
      const data = await prisma.user.findUnique({ where: { email } });
      if (!data) return null;
      return {
        id: data.id,
        email: data.email,
        passwordHash: data.passwordHash,
        name: data.name,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
    } catch (error) {
      throw new DatabaseOperationError("Failed to find user by email", {
        cause: error,
      });
    }
  }
}
