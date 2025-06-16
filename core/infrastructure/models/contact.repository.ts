import { DatabaseOperationError } from "@/core/domain/errors/common.error";
import { IContactRepository } from "@/core/domain/repositories/IContactRepository";
import {
  IOrganizedSearchParams,
  IRawContactWithPaginationData,
} from "@/core/domain/repositories/types/contact.types";
import {
  IContactFilter,
  IContactSort,
} from "@/core/domain/services/types/search-params-handler-service.type";
import { CONTACT_TAG_TYPE, Prisma } from "@prisma/client";
import { prisma } from "../prisma/prisma-client";

export class ContactRepository implements IContactRepository {
  private static readonly ITEMS_PER_PAGE: number = 10;

  async fetchBySearchParams(
    data: IOrganizedSearchParams
  ): Promise<IRawContactWithPaginationData> {
    try {
      const offset = (data.requestPage - 1) * ContactRepository.ITEMS_PER_PAGE;

      const whereClause = this.buildWhereClause(data.whereClauseRequirement);
      const orderByClause = this.buildOrderClause(data.sortClauseRequirement);

      const rawContactData = await prisma.contact.findMany({
        where: whereClause,
        orderBy: orderByClause,
        skip: offset,
        take: ContactRepository.ITEMS_PER_PAGE,
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

      return {
        contacts: rawContactData,
        itemsPerPage: ContactRepository.ITEMS_PER_PAGE,
      };
    } catch (error) {
      throw new DatabaseOperationError("Failed to fetch Contacts", {
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
