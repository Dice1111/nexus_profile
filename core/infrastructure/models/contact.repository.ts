import { DatabaseOperationError } from "@/core/domain/errors/common.error";
import { IContactRepository } from "@/core/domain/repositories/IContactRepository";
import {
  IOrganizedSearchParams,
  IRawContactWithSpecificCardData,
} from "@/core/domain/repositories/types/contact.types";
import {
  IContactFilter,
  IContactSort,
} from "@/core/domain/services/types/search-params-handler-service.type";
import { CONTACT_TAG_TYPE, Prisma } from "@prisma/client";
import { prisma } from "../prisma/prisma-client";

export class ContactRepository implements IContactRepository {
  async fetchWithSpecificCardDataBySearchParams(
    data: IOrganizedSearchParams
  ): Promise<IRawContactWithSpecificCardData[]> {
    try {
      const offset = (data.requestPage - 1) * data.itemsPerPage;

      const whereClause = this.buildWhereClause(data.whereClauseRequirement);
      const orderByClause = this.buildOrderClause(data.sortClauseRequirement);

      const rawData = await prisma.contact.findMany({
        where: whereClause,
        orderBy: orderByClause,
        skip: offset,
        take: data.itemsPerPage,
        include: {
          ContactCard: {
            select: {
              id: true,
              title: true,
              userId: true,
              Information: {
                select: {
                  occupation: true,
                  company: true,
                  fullName: true,
                },
              },
            },
          },
        },
      });

      return rawData;
    } catch (error) {
      throw new DatabaseOperationError("Failed to fetch Contacts", {
        cause: error,
      });
    }
  }

  async fetchTotalCountBySearchParams(data: IContactFilter): Promise<number> {
    try {
      const whereClause = this.buildWhereClause(data);

      const count = await prisma.contact.count({
        where: whereClause,
      });

      return count;
    } catch (error) {
      throw new DatabaseOperationError("Failed to fetch Contacts count", {
        cause: error,
      });
    }
  }

  private buildWhereClause(filters: IContactFilter): Prisma.ContactWhereInput {
    const where: Prisma.ContactWhereInput = {};
    where.cardId = filters.cardId;

    if (filters.tags) {
      where.tag = {
        in: filters.tags as CONTACT_TAG_TYPE[],
      };
    }

    if (filters.keyword) {
      where.ContactCard = {
        Information: {
          OR: [
            { fullName: { contains: filters.keyword, mode: "insensitive" } },
            { occupation: { contains: filters.keyword, mode: "insensitive" } },
            { company: { contains: filters.keyword, mode: "insensitive" } },
          ],
        },
      };
    }

    return where;
  }

  private buildOrderClause(
    sort: IContactSort
  ): Prisma.ContactOrderByWithRelationInput {
    return {
      [sort.item]: sort.order,
    } as Prisma.ContactOrderByWithRelationInput;
  }
}
