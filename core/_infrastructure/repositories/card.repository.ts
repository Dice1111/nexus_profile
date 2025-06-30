import { ICardRepository } from "@/core/_domain/repositories/ICardRepository";
import {
  CardWithTitleAndID,
  CardWithInformationAndDesignData,
} from "@/core/_domain/types/card-repository.types";
import { prisma } from "../prisma/prisma-client";
import { DatabaseOperationError } from "@/core/_domain/errors/common.error";

import { DesignModel } from "@/core/_domain/models/design.model";
import { InformationModel } from "@/core/_domain/models/information.model";
import { PROFILE_LAYOUT } from "@/core/_domain/enum/design-repository.enum";

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
  async fetchIdAndTitleByUserId(userId: string): Promise<CardWithTitleAndID[]> {
    try {
      const data = await prisma.card.findMany({
        where: { userId: userId },
      });
      return data;
    } catch (error) {
      throw new DatabaseOperationError("Failed to fetch title and id", {
        cause: error,
      });
    }
  }
  async fetchWithInformationAndDesignByUserID(
    userId: string
  ): Promise<CardWithInformationAndDesignData[]> {
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

      if (data.length === 0) return [];

      const fixData: CardWithInformationAndDesignData[] = data.map((item) => ({
        ...item,
        Design: item.Design
          ? {
              ...item.Design,
              layout: item.Design.layout as PROFILE_LAYOUT,
            }
          : null,
      }));

      return fixData;
    } catch (error) {
      throw new DatabaseOperationError("Failed to fetch cards", {
        cause: error,
      });
    }
  }
}
