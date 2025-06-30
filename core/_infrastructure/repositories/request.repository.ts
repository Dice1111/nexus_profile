import { IRequestRepository } from "@/core/_domain/repositories/IRequestRepository";
import {
  IRequestOrganizedSearchParams,
  RequestWithSpecificCardData,
} from "@/core/_domain/types/request-repository.type";
import {
  IRequestFilter,
  IRequestSort,
} from "@/core/_domain/types/search-params-handler-service.type";
import { prisma } from "../prisma/prisma-client";
import { DatabaseOperationError } from "@/core/_domain/errors/common.error";
import { Prisma } from "@prisma/client";
import {
  SORTABLE_ITEMS,
  SORTABLE_ORDERS,
} from "@/core/_domain/enum/search-params-handler-service.enum";

export class RequestRepository implements IRequestRepository {
  async fetchTotalRequestCountByCardId(cardId: string): Promise<number> {
    try {
      const count = await prisma.request.count({
        where: {
          cardId,
        },
      });

      return count;
    } catch (error) {
      throw new DatabaseOperationError("Failed to fetch request count", {
        cause: error,
      });
    }
  }
  async delete(requestId: number): Promise<void> {
    try {
      await prisma.request.delete({
        where: {
          id: requestId,
        },
      });
    } catch (error) {
      throw new DatabaseOperationError("Failed to delete request", {
        cause: error,
      });
    }
  }

  async fetchWithSpecificCardDataBySearchParams(
    data: IRequestOrganizedSearchParams
  ): Promise<RequestWithSpecificCardData[]> {
    try {
      const offset = (data.requestPage - 1) * data.itemsPerPage;

      const whereClause = this.buildWhereClause(data.whereClauseRequirement);
      const orderByClause = this.buildOrderClause(data.sortClauseRequirement);

      const rawRequests = await prisma.request.findMany({
        where: whereClause,
        orderBy: orderByClause,
        skip: offset,
        take: data.itemsPerPage,
        include: {
          SenderCard: {
            select: {
              Information: {
                select: {
                  fullName: true,
                  occupation: true,
                  company: true,
                },
              },
              Design: {
                select: {
                  profileImage: true,
                },
              },
            },
          },
        },
      });

      const fixData: RequestWithSpecificCardData[] = rawRequests.map(
        (item) => ({
          ...item,
          SenderCard: {
            ...item.SenderCard!,
            Information: item.SenderCard!.Information!,
            Design: item.SenderCard!.Design!,
          },
        })
      );

      return fixData;
    } catch (error) {
      throw new DatabaseOperationError("Failed to fetch Requests", {
        cause: error,
      });
    }
  }
  async fetchTotalCountBySearchParams(data: IRequestFilter): Promise<number> {
    try {
      const whereClause = this.buildWhereClause(data);
      const count = await prisma.request.count({
        where: whereClause,
      });

      return count;
    } catch (error) {
      throw new DatabaseOperationError("Failed to fetch Requests count", {
        cause: error,
      });
    }
  }
  private buildWhereClause(filters: IRequestFilter): Prisma.RequestWhereInput {
    const conditions: Prisma.RequestWhereInput[] = [];

    conditions.push({ cardId: filters.cardId });

    conditions.push({
      SenderCard: {
        Design: { isNot: null },
        Information: { isNot: null },
      },
    });

    if (filters.keyword) {
      conditions.push({
        SenderCard: {
          Information: {
            OR: [
              { fullName: { contains: filters.keyword, mode: "insensitive" } },
              {
                occupation: { contains: filters.keyword, mode: "insensitive" },
              },
              { company: { contains: filters.keyword, mode: "insensitive" } },
            ],
          },
        },
      });
    }

    return {
      AND: conditions,
    };
  }

  private buildOrderClause(
    sort: IRequestSort
  ): Prisma.RequestOrderByWithRelationInput {
    const sortOrder = sort.order === SORTABLE_ORDERS.ASC ? "asc" : "desc";

    if (sort.item === SORTABLE_ITEMS.FULL_NAME) {
      return {
        SenderCard: {
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
