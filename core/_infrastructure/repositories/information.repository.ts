import {
  DatabaseOperationError,
  NotFoundError,
} from "@/core/_domain/errors/common.error";
import { IInformationRepository } from "@/core/_domain/repositories/IInformationRepository";
import { FetchInformationData } from "@/core/_domain/types/information-repository.types";
import { prisma } from "../prisma/prisma-client";
import { Prisma } from "@prisma/client";

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

  async fetch(cardId: string): Promise<FetchInformationData> {
    try {
      const data = await prisma.information.findUniqueOrThrow({
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
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new NotFoundError("No Information Found", {
          cause: error,
        });
      }
      throw new DatabaseOperationError("Failed to fetch information", {
        cause: error,
      });
    }
  }
}
