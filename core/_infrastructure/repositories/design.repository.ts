import { DatabaseOperationError } from "@/core/_domain/errors/common.error";
import { DesignModel } from "@/core/_domain/models/design.model";
import { IDesignRepository } from "@/core/_domain/repositories/IDesignRepository";
import { IFetchDesignData } from "@/core/_domain/types/design-repository.types";
import { prisma } from "../prisma/prisma-client";

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
  async fetch(cardId: string): Promise<IFetchDesignData | null> {
    try {
      const data = await prisma.design.findUnique({
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

      console.log("design", data);

      return data;
    } catch (error) {
      throw new DatabaseOperationError("Failed to fetch design", {
        cause: error,
      });
    }
  }
}
