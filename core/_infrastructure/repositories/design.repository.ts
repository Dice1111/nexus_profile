import {
  DatabaseOperationError,
  NotFoundError,
} from "@/core/_domain/errors/common.error";
import { DesignModel } from "@/core/_domain/models/design.model";
import { IDesignRepository } from "@/core/_domain/repositories/IDesignRepository";
import { FetchDesignData } from "@/core/_domain/types/design-repository.types";
import { prisma } from "../prisma/prisma-client";
import { PROFILE_LAYOUT } from "@/core/_domain/enum/design-repository.enum";
import { Prisma } from "@prisma/client";

export class DesignRepository implements IDesignRepository {
  create(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async fetch(cardId: string): Promise<FetchDesignData> {
    try {
      const data = await prisma.design.findUniqueOrThrow({
        where: { cardId: cardId },
        select: {
          id: true,
          cardId: true,
          foregroundColor: true,
          backgroundColor: true,
          profileImage: true,
          logoImage: true,
          layout: true,
        },
      });

      const fixData = {
        ...data,
        layout: data.layout as PROFILE_LAYOUT,
      };
      return fixData;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new NotFoundError("No Design Found", {
          cause: error,
        });
      }

      throw new DatabaseOperationError("Failed to fetch design", {
        cause: error,
      });
    }
  }
}
