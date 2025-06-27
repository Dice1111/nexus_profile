import {
  PROFILE_COMPONENT_CATEGORY,
  PROFILE_COMPONENT_TYPE,
} from "@/core/_domain/enum/profile-component-repository.enum";
import { prisma } from "../prisma/prisma-client";
import { DatabaseOperationError } from "@/core/_domain/errors/common.error";
import { IProfileComponentRepository } from "@/core/_domain/repositories/IProfileComponentRepository";
import { IFetchProfileComponentData } from "@/core/_domain/types/profile-component-repository.types";

export class ProfileComponentRepository implements IProfileComponentRepository {
  async create(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async update(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async delete(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async fetch(cardId: string): Promise<IFetchProfileComponentData[]> {
    try {
      const data = await prisma.profileComponent.findMany({
        where: { cardId: cardId },
        select: {
          id: true,
          cardId: true,
          type: true,
          category: true,
          label: true,
          value: true,
          position: true,
        },
      });

      const typeFixData = data.map((item) => ({
        ...item,
        type: item.type as PROFILE_COMPONENT_TYPE,
        category: item.category as PROFILE_COMPONENT_CATEGORY,
        label: item.label ?? "",
      }));

      return typeFixData;
    } catch (error) {
      throw new DatabaseOperationError(JSON.stringify({}));
    }
  }
}
