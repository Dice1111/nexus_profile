import { InformationModel } from "@/core/_domain/models/information.model";
import { IInformationRepository } from "@/core/_domain/repositories/IInformationRepository";
import { prisma } from "../prisma/prisma-client";
import { DatabaseOperationError } from "@/core/_domain/errors/common.error";

export class InformationRepository implements IInformationRepository {
  create(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async fetch(cardID: string): Promise<InformationModel> {
    try {
      const data = await prisma.information.findUnique({
        where: { cardId: cardID },
      });
      return data as InformationModel;
    } catch (error) {
      throw new DatabaseOperationError("Failed to fetch information");
    }
  }
}
