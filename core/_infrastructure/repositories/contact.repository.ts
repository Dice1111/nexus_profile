import { CONTACT_TAG_ENUM } from "@/core/_domain/enum/contact-repository.enum";
import {
  SORTABLE_ITEMS,
  SORTABLE_ORDERS,
} from "@/core/_domain/enum/search-params-handler-service.enum";
import {
  DatabaseOperationError,
  DomainTypeMappingError,
  UniqueConstraintError,
} from "@/core/_domain/errors/common.error";
import { IContactRepository } from "@/core/_domain/repositories/IContactRepository";
import {
  IContactOrganizedSearchParams,
  CreateContactInput,
  ContactWithSpecificCardData,
} from "@/core/_domain/types/contact-repository.types";
import {
  IContactFilter,
  IContactSort,
} from "@/core/_domain/types/search-params-handler-service.type";
import { IUpdateTagOrNoteData } from "@/schema/contact/update-contact-or-delete.schema";
import { CONTACT_TAG_TYPE, Prisma } from "@prisma/client";
import { prisma } from "../prisma/prisma-client";

export class ContactRepository implements IContactRepository {
  async fetchDailyFollowerCountByCardId(
    cardId: string
  ): Promise<{ date: Date; count: number }[]> {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 29);
      startDate.setHours(0, 0, 0, 0);

      const rawData = await prisma.$queryRaw<{ date: Date; count: number }[]>`
    SELECT 
      DATE("createdAt") as date,
      COUNT(*) as count
    FROM "Contact"
    WHERE "contactCardId" = ${cardId}
      AND "createdAt" >= ${startDate}
    GROUP BY DATE("createdAt")
    ORDER BY DATE("createdAt") ASC;
  `;
      return rawData;
    } catch (error) {
      throw new DatabaseOperationError("Failed to fetch daily follower count", {
        cause: error,
      });
    }
  }
  async fetchTotalContactCountByCardId(cardId: string): Promise<number> {
    try {
      const count = await prisma.contact.count({
        where: {
          cardId,
        },
      });

      return count;
    } catch (error) {
      throw new DatabaseOperationError("Failed to fetch contact count", {
        cause: error,
      });
    }
  }
  async fetchTotalFollowerCountByCardId(cardId: string): Promise<number> {
    try {
      const count = await prisma.contact.count({
        where: {
          contactCardId: cardId,
        },
      });

      return count;
    } catch (error) {
      throw new DatabaseOperationError("Failed to fetch follower count", {
        cause: error,
      });
    }
  }
  async updateTagOrNote(data: IUpdateTagOrNoteData): Promise<void> {
    const updateData: Partial<{ tag: CONTACT_TAG_TYPE; note: string }> = {};

    if ("tag" in data) {
      updateData.tag = this.mapDomainTagToPrisma(data.tag!);
    }
    if ("note" in data) {
      updateData.note = data.note;
    }

    await prisma.contact.update({
      where: { id: data.contactId },
      data: updateData,
    });
  }
  async delete(contactId: number): Promise<void> {
    try {
      await prisma.contact.delete({
        where: {
          id: contactId,
        },
      });
    } catch (error) {
      throw new DatabaseOperationError("Failed to delete contact", {
        cause: error,
      });
    }
  }
  async create(data: CreateContactInput): Promise<void> {
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
  ): Promise<ContactWithSpecificCardData[]> {
    try {
      const offset = (data.requestPage - 1) * data.itemsPerPage;

      const whereClause = this.buildWhereClause(data.whereClauseRequirement);
      const orderByClause = this.buildOrderClause(data.sortClauseRequirement);

      const rawData = await prisma.contact.findMany({
        where: {
          ...whereClause,
          ContactCard: {
            Design: {
              isNot: null,
            },
            Information: {
              isNot: null,
            },
          },
        },
        orderBy: orderByClause,
        skip: offset,
        take: data.itemsPerPage,
        include: {
          ContactCard: {
            select: {
              id: true,
              title: true,
              userId: true,
              Design: {
                select: {
                  profileImage: true,
                },
              },
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

      const fixData: ContactWithSpecificCardData[] = rawData.map((item) => ({
        ...item,
        tag: item.tag as CONTACT_TAG_ENUM,
        ContactCard: {
          ...item.ContactCard!,
          Information: item.ContactCard!.Information!,
          Design: item.ContactCard!.Design!,
        },
      }));

      return fixData;
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

  private mapDomainTagToPrisma(tag: CONTACT_TAG_ENUM): CONTACT_TAG_TYPE {
    switch (tag) {
      case CONTACT_TAG_ENUM.FAVOURITE:
        return CONTACT_TAG_TYPE.FAVOURITE;
      case CONTACT_TAG_ENUM.NEW:
        return CONTACT_TAG_TYPE.NEW;
      case CONTACT_TAG_ENUM.FAMILY:
        return CONTACT_TAG_TYPE.FAMILY;
      case CONTACT_TAG_ENUM.FRIEND:
        return CONTACT_TAG_TYPE.FRIEND;
      case CONTACT_TAG_ENUM.COLLEAGUE:
        return CONTACT_TAG_TYPE.COLLEAGUE;
      case CONTACT_TAG_ENUM.CLIENT:
        return CONTACT_TAG_TYPE.CLIENT;
      case CONTACT_TAG_ENUM.SUPPLIER:
        return CONTACT_TAG_TYPE.SUPPLIER;
      case CONTACT_TAG_ENUM.EMPLOYEE:
        return CONTACT_TAG_TYPE.EMPLOYEE;
      case CONTACT_TAG_ENUM.INVESTOR:
        return CONTACT_TAG_TYPE.INVESTOR;
      case CONTACT_TAG_ENUM.VENDOR:
        return CONTACT_TAG_TYPE.VENDOR;
      case CONTACT_TAG_ENUM.OTHER:
        return CONTACT_TAG_TYPE.OTHER;
      default:
        throw new DomainTypeMappingError(
          "Failed to map CONTACT_TAG_ENUM to CONTACT_TAG_TYPE",
          {
            cause: `Unsupported contact tag: ${tag}`,
          }
        );
    }
  }
}
