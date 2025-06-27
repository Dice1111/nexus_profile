import { ProfileComponentModel } from "@/core/_domain/models/profile-component.model";
import {
  PROFILE_COMPONENT_TYPE,
  PROFILE_COMPONENT_CATEGORY,
} from "@/lib/types/enums";
import { prisma } from "../prisma/prisma-client";
import { DatabaseOperationError } from "@/core/_domain/errors/common.error";
import { IProfileComponentRepository } from "@/core/_domain/repositories/IProfileComponentRepository";

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
  async fetch(cardID: string): Promise<ProfileComponentModel[]> {
    try {
      const data = await prisma.profileComponent.findMany({
        where: { cardId: cardID },
      });

      const typeFixData = data.map((item) => ({
        ...item,
        type: item.type as PROFILE_COMPONENT_TYPE,
        category: item.category as PROFILE_COMPONENT_CATEGORY,
      }));

      return typeFixData;
    } catch (error) {
      throw new DatabaseOperationError(JSON.stringify({}));
    }
  }
}
