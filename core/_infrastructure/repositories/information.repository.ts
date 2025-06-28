import { DatabaseOperationError } from "@/core/_domain/errors/common.error";
import { IInformationRepository } from "@/core/_domain/repositories/IInformationRepository";
import { FetchInformationData } from "@/core/_domain/types/information-repository.types";
import { prisma } from "../prisma/prisma-client";

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

  async fetch(cardId: string): Promise<FetchInformationData | null> {
    console.log("cardId", cardId);

    try {
      const data = await prisma.information.findUnique({
        where: { cardId: cardId },
        select: {
          id: true,
          cardId: true,
          title: true,
          fullName: true,
          occupation: true,
          company: true,
          message: true,
          quote: true,
          prefix: true,
          suffix: true,
          preferredName: true,
          pronouns: true,
        },
      });
      return data;
    } catch (error) {
      throw new DatabaseOperationError("Failed to fetch information", {
        cause: error,
      });
    }
  }
}
