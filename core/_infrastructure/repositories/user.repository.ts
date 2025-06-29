import { Prisma } from "@prisma/client";
import {
  DatabaseOperationError,
  NotFoundError,
  UniqueConstraintError,
} from "../../_domain/errors/common.error";

import {
  CreateUserInput,
  UpdateNameInput,
  UserSettingResponse,
} from "@/core/_domain/types/user-repository.types";
import { IUserRepository } from "../../_domain/repositories/IUserRepository";
import { prisma } from "../prisma/prisma-client";

export class UserRepository implements IUserRepository {
  async updateUserName(data: UpdateNameInput): Promise<void> {
    try {
      await prisma.user.update({
        where: { id: data.id },
        data: {
          name: data.name,
        },
      });
    } catch (error) {
      throw new DatabaseOperationError("Failed to update user name", {
        cause: error,
      });
    }
  }
  async fetchUserSettingDataById(id: string): Promise<UserSettingResponse> {
    console.log("id", id);
    try {
      const data = await prisma.user.findUniqueOrThrow({
        where: { id: id },
        select: {
          name: true,
          email: true,
          image: true,
        },
      });
      return data;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new NotFoundError("No User Setting Data Found", {
          cause: error,
        });
      }

      console.log("Error", error);

      throw new DatabaseOperationError("Failed to fetch User Setting Data", {
        cause: error,
      });
    }
  }
  async create(data: CreateUserInput): Promise<void> {
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
  async findPasswordHashByEmail(email: string): Promise<string> {
    try {
      const data = await prisma.user.findUniqueOrThrow({
        where: { email },
        select: {
          passwordHash: true,
        },
      });
      return data.passwordHash;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new NotFoundError("No User Found", {
          cause: error,
        });
      }
      throw new DatabaseOperationError("Failed to find user by email", {
        cause: error,
      });
    }
  }
}
