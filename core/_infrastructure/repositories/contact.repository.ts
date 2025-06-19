import {
  DatabaseOperationError,
  UniqueConstraintError,
} from "@/core/_domain/errors/common.error";
import { IContactRepository } from "@/core/_domain/repositories/IContactRepository";
import {
  IContactOrganizedSearchParams,
  IRawContactWithSpecificCardData,
} from "@/core/_domain/repositories/types/contact.types";
import {
  IContactFilter,
  IContactSort,
} from "@/core/_domain/services/types/search-params-handler-service.type";
import { CONTACT_TAG_TYPE, Prisma } from "@prisma/client";
import { prisma } from "../prisma/prisma-client";
import {
  SORTABLE_ITEMS,
  SORTABLE_ORDERS,
} from "@/core/_domain/enum/search-params-handler-service.enum";
import { ICreateContactData } from "@/core/_domain/repositories/types/request.type";

export class ContactRepository implements IContactRepository {
  async create(data: ICreateContactData): Promise<void> {
    try {
      await prisma.contact.create({
        data: {
          cardId: data.cardId,
          contactCardId: data.contactCardId,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new UniqueConstraintError("A Person is already in contact", {
          cause: error,
        });
      }
      throw new DatabaseOperationError("Failed to create contact", {
        cause: error,
      });
    }
  }
  async fetchWithSpecificCardDataBySearchParams(
    data: IContactOrganizedSearchParams
  ): Promise<IRawContactWithSpecificCardData[]> {
    try {
      const offset = (data.requestPage - 1) * data.itemsPerPage;

      const whereClause = this.buildWhereClause(data.whereClauseRequirement);
      const orderByClause = this.buildOrderClause(data.sortClauseRequirement);

      console.log(whereClause);
      console.log(orderByClause);

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

      console.log(rawData);

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
    console.log(filters.cardId);

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
    const sortOrder = sort.order === SORTABLE_ORDERS.ASC ? "asc" : "desc";

    if (sort.item === SORTABLE_ITEMS.FULL_NAME) {
      return {
        ContactCard: {
          Information: {
            fullName: sortOrder,
          },
        },
      };
    }

    return {
      createdAt: sortOrder,
    };
  }
}
