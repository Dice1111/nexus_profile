import { IRequestRepository } from "@/core/domain/repositories/IRequestRepository";
import {
  IRequestOrganizedSearchParams,
  IRawRequestWithSpecificCardData,
} from "@/core/domain/repositories/types/request.type";
import {
  IRequestFilter,
  IRequestSort,
} from "@/core/domain/services/types/search-params-handler-service.type";
import { prisma } from "../prisma/prisma-client";
import { DatabaseOperationError } from "@/core/domain/errors/common.error";
import { Prisma } from "@prisma/client";

export class RequestRepository implements IRequestRepository {
  async fetchWithSpecificCardDataBySearchParams(
    data: IRequestOrganizedSearchParams
  ): Promise<IRawRequestWithSpecificCardData[]> {
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
            },
          },
        },
      });

      return rawRequests;
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
    const where: Prisma.RequestWhereInput = {};
    where.cardId = filters.cardId;

    if (filters.keyword) {
      where.SenderCard = {
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
    sort: IRequestSort
  ): Prisma.RequestOrderByWithRelationInput {
    return {
      [sort.item]: sort.order,
    } as Prisma.RequestOrderByWithRelationInput;
  }
}
