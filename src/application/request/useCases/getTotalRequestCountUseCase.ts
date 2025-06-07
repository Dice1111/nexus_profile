import { getTotalRequestCount } from "@/src/infrastructure/request/request";
import { SearchParams } from "@/lib/url-state";
import { Prisma } from "@prisma/client";

export async function getTotalRequestCountUseCase(searchParams: SearchParams) {
  const cardId = "applecard";

  const whereClause: Prisma.RequestWhereInput = {
    cardId: cardId,
  };

  if (searchParams.search) {
    const keyword = searchParams.search;
    whereClause.SenderCard = {
      Information: {
        OR: [
          { firstName: { contains: keyword, mode: "insensitive" } },
          { middleName: { contains: keyword, mode: "insensitive" } },
          { lastName: { contains: keyword, mode: "insensitive" } },
          { occupation: { contains: keyword, mode: "insensitive" } },
          { company: { contains: keyword, mode: "insensitive" } },
        ],
      },
    };
  }

  const data = await getTotalRequestCount({
    whereClause,
  });

  return data;
}
