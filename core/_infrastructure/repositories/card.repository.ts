import { ICardRepository } from "@/core/_domain/repositories/ICardRepository";
import {
  ICardWithTitleAndID,
  IFetchCardWithInformationAndDesignData,
} from "@/core/_domain/types/card-repository.types";
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
    userId: string
  ): Promise<IFetchCardWithInformationAndDesignData[]> {
    try {
      const data = await prisma.card.findMany({
        where: { userId: userId },
        select: {
          id: true,
          title: true,
          Information: {
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
          },
          Design: {
            select: {
              id: true,
              cardId: true,
              foregroundColor: true,
              backgroundColor: true,
              profileImage: true,
              logoImage: true,
              layout: true,
            },
          },
        },
      });

      return data;
    } catch (error) {
      throw new DatabaseOperationError("Failed to fetch cards", {
        cause: error,
      });
    }
  }
}
