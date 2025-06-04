import { prisma } from "@/lib/prisma-client";
import { ITEMS_PER_PAGE } from "@/util/utils";
import { Prisma } from "@prisma/client";

interface RequestDTO {
  id: number;
  cardId: string;
  senderCardId: string;
  createdAt: Date;
  updatedAt: Date;
  SenderCard: {
    Information: {
      occupation: string | null;
      company: string | null;
      firstName: string | null;
      middleName: string | null;
      lastName: string | null;
    } | null;
  };
}
export interface FlatRequestDTO {
  id: number;
  cardId: string;
  senderCardId: string;
  createdAt: string;
  updatedAt: string;
  occupation: string | null;
  company: string | null;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
}
function ToFlatRequestDTOs(requests: RequestDTO[]): FlatRequestDTO[] {
  return requests.map((request) => {
    const info = request.SenderCard?.Information;

    return {
      id: request.id,
      cardId: request.cardId,
      senderCardId: request.senderCardId,
      createdAt: request.createdAt.toISOString(),
      updatedAt: request.updatedAt.toISOString(),
      occupation: info?.occupation ?? null,
      company: info?.company ?? null,
      firstName: info?.firstName ?? null,
      middleName: info?.middleName ?? null,
      lastName: info?.lastName ?? null,
    };
  });
}

interface RequestCountDTO {
  count: number;
}

interface GetRequestCountDTO {
  whereClause?: Prisma.RequestWhereInput;
}

interface GetRequestWithPaginationDTO {
  whereClause?: Prisma.RequestWhereInput;
  orderBy?: Prisma.RequestOrderByWithRelationInput;
  offset: number;
}

export async function getRequestWithPagination({
  whereClause,
  orderBy,
  offset,
}: GetRequestWithPaginationDTO): Promise<FlatRequestDTO[]> {
  try {
    const requests = await prisma.request.findMany({
      where: whereClause,
      orderBy: orderBy,
      skip: offset,
      take: ITEMS_PER_PAGE,
      include: {
        SenderCard: {
          select: {
            Information: {
              select: {
                occupation: true,
                company: true,
                firstName: true,
                middleName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    return ToFlatRequestDTOs(requests);
  } catch (error: any) {
    throw new Error("Failed to retrieve request data.");
  }
}
export async function getTotalRequestCount({
  whereClause,
}: GetRequestCountDTO): Promise<RequestCountDTO> {
  try {
    const contacts = await prisma.request.count({
      where: whereClause,
    });

    return { count: contacts };
  } catch (error: any) {
    throw new Error("Failed to retrieve Data.");
  }
}
