import { DatabaseOperationError } from "@/core/_domain/errors/common.error";
import { DesignModel } from "@/core/_domain/models/design.model";
import { IDesignRepository } from "@/core/_domain/repositories/IDesignRepository";
import { FetchDesignData } from "@/core/_domain/types/design-repository.types";
import { prisma } from "../prisma/prisma-client";
import { PROFILE_LAYOUT } from "@/core/_domain/enum/design-repository.enum";

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
  async fetch(cardId: string): Promise<FetchDesignData | null> {
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
      if (data) {
        const fixData = {
          ...data,
          layout: data.layout as PROFILE_LAYOUT,
        };
        return fixData;
      }
      return null;
    } catch (error) {
      throw new DatabaseOperationError("Failed to fetch design", {
        cause: error,
      });
    }
  }
}
