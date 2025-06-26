import { ICardRepository } from "@/core/_domain/repositories/ICardRepository";
import {
  ICardWithTitleAndID,
  IFetchCardWithInformationAndDesignData,
} from "@/core/_domain/repositories/types/card.types";
import { prisma } from "../prisma/prisma-client";
import { DatabaseOperationError } from "@/core/_domain/errors/common.error";

export class CardRepository implements ICardRepository {
  create(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(cardId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(cardId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  fetchByUserID(userID: string): Promise<ICardWithTitleAndID[]> {
    throw new Error("Method not implemented.");
  }
  async fetchWithInformationAndDesignByUserID(
    userID: string
  ): Promise<IFetchCardWithInformationAndDesignData[]> {
    try {
      const data = await prisma.card.findMany({
        where: { userId: userID },
        select: {
          id: true,
          title: true,
          Information: true,
          Design: true,
        },
      });

      console.log(data);
      return data;
    } catch (error) {
      throw new DatabaseOperationError("Failed to fetch cards", {
        cause: error,
      });
    }
  }
}
