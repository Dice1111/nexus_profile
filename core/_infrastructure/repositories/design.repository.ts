import { DatabaseOperationError } from "@/core/_domain/errors/common.error";
import { DesignModel } from "@/core/_domain/models/design.model";
import { IDesignRepository } from "@/core/_domain/repositories/IDesignRepository";
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
  async fetch(cardID: string): Promise<DesignModel> {
    try {
      const data = await prisma.design.findUnique({
        where: { cardId: cardID },
      });

      return data as DesignModel;
    } catch (error) {
      throw new DatabaseOperationError("Failed to fetch design");
    }
  }
}
